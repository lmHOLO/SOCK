package com.holo.sock.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@AllArgsConstructor
@Getter
@Builder
@RedisHash(value = "snackQScore")
public class SnackQScoreRedis {

    @Id
    private String id;

    @Indexed
    private Long snackId;

    private long score;

    public void addScore(){
        score++;
    }

    public void subScore(){
        score--;
    }
}
