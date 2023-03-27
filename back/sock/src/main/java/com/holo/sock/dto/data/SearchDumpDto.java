package com.holo.sock.dto.data;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SearchDumpDto {

    private Long member_id;
    private Long snack_id;
    private int count;

}
