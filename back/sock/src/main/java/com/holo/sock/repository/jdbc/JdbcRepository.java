package com.holo.sock.repository.jdbc;

import com.holo.sock.dto.data.PurchaseDumpDto;
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

    private int batchInsertPurchase(int batchCount, List<PurchaseDumpDto> subItems){
        jdbcTemplate.batchUpdate("insert into purchase (create_date, last_modified_date, count, member_id, snack_id) " +
                        "values (now(), now(), ?, ?, ?)"
                , new BatchPreparedStatementSetter() {
                    @Override
                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setInt(1, subItems.get(i).getPurchase());
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

}
