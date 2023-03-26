package com.holo.sock.dto.redis;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SnackQScoreRedisDto {
    private Long id;
    private Long snackId;
    private long score;
}
