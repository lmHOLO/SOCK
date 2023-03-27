package com.holo.sock.repository.jdbc;

import com.holo.sock.dto.redis.SearchRedisDto;
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
public class JdbcSearchRepository {

    private final JdbcTemplate jdbcTemplate;
    private int batchSize = 50;

    public void insertSearchFromRedis(List<SearchRedisDto> items){
        int batchCount = 0;
        List<SearchRedisDto> subItems = new ArrayList<>();

        for(int i = 0; i < items.size(); i++){
            subItems.add(items.get(i));
            if((i+1) % batchSize == 0){
                batchCount = batchInsertSearchFromRedis(batchCount, subItems);
            }
        }
        if(!subItems.isEmpty()){
            batchInsertSearchFromRedis(batchCount, subItems);
        }
    }

    public void updateSearchFromRedis(List<SearchRedisDto> items){
        int batchCount = 0;
        List<SearchRedisDto> subItems = new ArrayList<>();

        for(int i = 0; i < items.size(); i++){
            subItems.add(items.get(i));
            if((i+1) % batchSize == 0){
                batchCount = batchUpdateSearchFromRedis(batchCount, subItems);
            }
        }
        if(!subItems.isEmpty()){
            batchUpdateSearchFromRedis(batchCount, subItems);
        }
    }

    private int batchInsertSearchFromRedis(int batchCount, List<SearchRedisDto> subItems){
        jdbcTemplate.batchUpdate("insert into search (create_date, last_modified_date, count, member_id, snack_id) " +
                        "values (now(), now(), ?, ?, ?)"
                , new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setInt(1, subItems.get(i).getCount());
                        ps.setLong(2, subItems.get(i).getMemberId());
                        ps.setLong(3, subItems.get(i).getSnackId());
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

    private int batchUpdateSearchFromRedis(int batchCount, List<SearchRedisDto> subItems){
        jdbcTemplate.batchUpdate("update search set count = ?, last_modified_date = now() where search_id = ?"
                , new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setInt(1, subItems.get(i).getCount());
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
