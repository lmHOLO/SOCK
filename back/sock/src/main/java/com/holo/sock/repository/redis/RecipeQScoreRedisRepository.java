package com.holo.sock.repository.redis;

import com.holo.sock.entity.redis.RecipeQScoreRedis;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeQScoreRedisRepository extends CrudRepository<RecipeQScoreRedis, String> {
    Optional<RecipeQScoreRedis> findByRecipeId(Long recipeId);
    List<RecipeQScoreRedis> findAll();
}
