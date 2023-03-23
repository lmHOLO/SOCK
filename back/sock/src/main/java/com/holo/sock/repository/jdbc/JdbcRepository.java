package com.holo.sock.repository.jdbc;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
@RequiredArgsConstructor
public class JdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    public List<GroupSnackDto> preferenceSnacksGroup(){
        List<GroupSnackDto> result = jdbcTemplate.query("select f.flavor_id as flavorId, f.name as flavorName, GROUP_CONCAT(s.snack_id) as snackIds " +
                        "from snack s " +
                        "join snack_flavor sf on sf.snack_id = s.snack_id " +
                        "join flavor f on f.flavor_id = sf.flavor_id " +
                        "group by f.flavor_id",
                (rs, rowNum) -> GroupSnackDto.builder()
                        .flavorId(rs.getLong("flavorId"))
                        .flavorName(rs.getString("flavorName"))
                        .snackIds(rs.getString("snackIds"))
                        .build()
        );

        return result;
    }
}
