package com.holo.sock.repository.redis;

import com.holo.sock.entity.redis.SnackQScoreRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface SnackQScoreRedisRepository extends CrudRepository<SnackQScoreRedis, String> {
    Optional<SnackQScoreRedis> findBySnackId(Long snackId);

    List<SnackQScoreRedis> findAll();
}
