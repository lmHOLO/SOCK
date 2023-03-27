package com.holo.sock.repository.jdbc;

import com.holo.sock.dto.redis.SnackQScoreRedisDto;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class JdbcSnackQScoreRepository {

    private final JdbcTemplate jdbcTemplate;
    private int batchSize = 50;

    public void insertSnackQScoreFromRedis(List<SnackQScoreRedisDto> items) {
        int batchCount = 0;
        List<SnackQScoreRedisDto> subItems = new ArrayList<>();

        for (int i = 0; i < items.size(); i++) {
            subItems.add(items.get(i));
            if ((i + 1) % batchSize == 0) {
                batchCount = batchInsertSnackQScoreFromRedis(batchCount, subItems);
            }
        }
        if(!subItems.isEmpty()){
            batchInsertSnackQScoreFromRedis(batchCount, subItems);
        }
    }

    public void updateSnackQScoreFromRedis(List<SnackQScoreRedisDto> items) {
        int batchCount = 0;
        List<SnackQScoreRedisDto> subItems = new ArrayList<>();

        for (int i = 0; i < items.size(); i++) {
            subItems.add(items.get(i));
            if ((i + 1) % batchSize == 0) {
                batchCount = batchUpdateSnackQScoreFromRedis(batchCount, subItems);
            }
        }
        if(!subItems.isEmpty()){
            batchUpdateSnackQScoreFromRedis(batchCount, subItems);
        }
    }

    private int batchInsertSnackQScoreFromRedis(int batchCount, List<SnackQScoreRedisDto> subItems) {
        jdbcTemplate.batchUpdate("insert into snack_qscore (create_date, last_modified_date, score, snack_id) " +
                        "values (now(), now(), ?, ?)"
                , new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, subItems.get(i).getScore());
                        ps.setLong(2, subItems.get(i).getSnackId());
                    }

                    @Override
                    public int getBatchSize() {
                        return subItems.size();
                    }
                });

        subItems.clear();
        batchCount++;
        return batchCount;
    }

    private int batchUpdateSnackQScoreFromRedis(int batchCount, List<SnackQScoreRedisDto> subItems) {
        jdbcTemplate.batchUpdate("update snack_qscore set score = ?, last_modified_date = now() " +
                        "where snack_qscore_id = ?"
                , new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setLong(1, subItems.get(i).getScore());
                        ps.setLong(2, subItems.get(i).getId());
                    }

                    @Override
                    public int getBatchSize() {
                        return subItems.size();
                    }
                });

        subItems.clear();
        batchCount++;
        return batchCount;
    }
}
