package com.holo.sock.dto.redis;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RecipeQScoreRedisDto {
    private Long id;
    private Long recipeId;
    private long score;
}
