package com.holo.sock.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Getter
@AllArgsConstructor
@Builder
@RedisHash(value = "search")
public class SearchRedis {
    @Id
    private String id;
    @Indexed
    private Long memberId;
    @Indexed
    private Long snackId;
    private int count;

    public void addCount(){
        this.count++;
    }
}
