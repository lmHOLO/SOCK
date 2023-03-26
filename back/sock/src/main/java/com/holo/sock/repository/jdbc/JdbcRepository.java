package com.holo.sock.repository.jdbc;

import com.holo.sock.dto.data.PurchaseDumpDto;
import com.holo.sock.dto.data.ReviewDumpDto;
import com.holo.sock.dto.data.SearchDumpDto;
import com.holo.sock.dto.search.SearchRedisDto;
import com.holo.sock.dto.snack.response.SnackPreferenceResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class JdbcRepository {

    private final JdbcTemplate jdbcTemplate;
    private int batchSize = 50;

    public List<String> preferenceSnacksGroup(){
        return jdbcTemplate.query("select GROUP_CONCAT(s.snack_id) as snackIds " +
                        "from snack s " +
                        "join snack_flavor sf on sf.snack_id = s.snack_id " +
                        "join flavor f on f.flavor_id = sf.flavor_id " +
                        "group by f.flavor_id",
                (rs, rowNum) ->  (rs.getString("snackIds"))
        );
    }

    public List<SnackPreferenceResponseDto> preferenceSnackList(String snacks){
        return jdbcTemplate.query("select snack_id, name, image " +
                        "from snack " +
                        "where snack_id in ( "+ snacks + " ) " +
                        "order by FIND_IN_SET(snack_id, ?)",
                (rs, rowNum) ->
                        SnackPreferenceResponseDto.builder()
                                .snackId(rs.getLong("snack_id"))
                                .name(rs.getString("name"))
                                .image(rs.getString("image"))
                                .build()
                , snacks);
    }

    public void savePurchase(List<PurchaseDumpDto> items){
        int batchCount = 0;
        List<PurchaseDumpDto> subItems = new ArrayList<>();

        for(int i = 0; i < items.size(); i++){
            subItems.add(items.get(i));
            if((i+1) % batchSize == 0){
                batchCount = batchInsertPurchase(batchCount, subItems);
            }
        }
        if(!subItems.isEmpty()){
            batchCount = batchInsertPurchase(batchCount, subItems);
        }
    }

    public void saveReview(List<ReviewDumpDto> items){
        int batchCount = 0;
        List<ReviewDumpDto> subItems = new ArrayList<>();

        for(int i = 0; i < items.size(); i++){
            subItems.add(items.get(i));
            if((i+1) % batchSize == 0){
                batchCount = batchInsertReview(batchCount, subItems);
            }
        }
        if(!subItems.isEmpty()){
            batchCount = batchInsertReview(batchCount, subItems);
        }
    }

    public void saveSearch(List<SearchDumpDto> items){
        int batchCount = 0;
        List<SearchDumpDto> subItems = new ArrayList<>();

        for(int i = 0; i < items.size(); i++){
            subItems.add(items.get(i));
            if((i+1) % batchSize == 0){
                batchCount = batchInsertSearch(batchCount, subItems);
            }
        }
        if(!subItems.isEmpty()){
            batchCount = batchInsertSearch(batchCount, subItems);
        }
    }

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

    private int batchInsertPurchase(int batchCount, List<PurchaseDumpDto> subItems){
        jdbcTemplate.batchUpdate("insert into purchase (create_date, last_modified_date, count, member_id, snack_id) " +
                        "values (now(), now(), ?, ?, ?)"
                , new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setInt(1, subItems.get(i).getCount());
                        ps.setLong(2, subItems.get(i).getMember_id());
                        ps.setLong(3, subItems.get(i).getSnack_id());
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

    private int batchInsertReview(int batchCount, List<ReviewDumpDto> subItems){
        jdbcTemplate.batchUpdate("insert into review (create_date, last_modified_date, content, star, writer_id, snack_id) " +
                        "values (now(), now(), ?, ?, ?, ?)"
                , new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setString(1, "테스트 리뷰입니다.");
                        ps.setInt(2, subItems.get(i).getStar());
                        ps.setLong(3, subItems.get(i).getWriter_id());
                        ps.setLong(4, subItems.get(i).getSnack_id());
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

    private int batchInsertSearch(int batchCount, List<SearchDumpDto> subItems){
        jdbcTemplate.batchUpdate("insert into search (create_date, last_modified_date, count, member_id, snack_id) " +
                        "values (now(), now(), ?, ?, ?)"
                , new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setInt(1, subItems.get(i).getCount());
                        ps.setLong(2, subItems.get(i).getMember_id());
                        ps.setLong(3, subItems.get(i).getSnack_id());
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
