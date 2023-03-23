package com.holo.sock.repository.jdbc;

import com.holo.sock.dto.snack.response.SnackPreferenceResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class JdbcRepository {

    private final JdbcTemplate jdbcTemplate;

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
}
