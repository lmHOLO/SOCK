package com.holo.sock.dto.redis;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SearchRedisDto {
    private Long id;
    private Long memberId;
    private Long snackId;
    private int count;
}
