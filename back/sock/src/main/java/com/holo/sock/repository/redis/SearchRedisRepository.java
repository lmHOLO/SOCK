package com.holo.sock.repository.redis;

import com.holo.sock.entity.redis.SearchRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface SearchRedisRepository extends CrudRepository<SearchRedis, String> {
    Optional<SearchRedis> findByMemberIdAndSnackId(Long memberId, Long snackId);
    List<SearchRedis> findAll();
}
