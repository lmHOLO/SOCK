package com.holo.sock.dto.data;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ReviewDumpDto {

    private Long writer_id;
    private Long snack_id;
    private int star;
}
