package com.holo.sock.repository.redis;

import com.holo.sock.entity.redis.PurchaseRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface PurchaseRedisRepository extends CrudRepository<PurchaseRedis, String> {

    Optional<PurchaseRedis> findByMemberIdAndSnackId(Long memberId, Long snackId);

    List<PurchaseRedis> findAll();
}
