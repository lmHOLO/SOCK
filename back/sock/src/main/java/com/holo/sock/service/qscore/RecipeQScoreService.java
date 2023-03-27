package com.holo.sock.service.qscore;

import com.holo.sock.dto.redis.RecipeQScoreRedisDto;
import com.holo.sock.entity.qscore.RecipeQScore;
import com.holo.sock.entity.recipe.Recipe;
import com.holo.sock.entity.redis.RecipeQScoreRedis;
import com.holo.sock.exception.recipeqscore.RecipeQScoreNotFoundException;
import com.holo.sock.repository.jdbc.JdbcRecipeQScoreRepository;
import com.holo.sock.repository.qscore.RecipeQScoreRepository;
import com.holo.sock.repository.redis.RecipeQScoreRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecipeQScoreService {
    private final RecipeQScoreRepository recipeQScoreRepository;
    private final RecipeQScoreRedisRepository recipeQScoreRedisRepository;
    private final JdbcRecipeQScoreRepository jdbcRecipeQScoreRepository;

    @Transactional
    public void addQScore(Recipe recipe){
        Long recipeId = recipe.getId();
        Optional<RecipeQScoreRedis> optionalRecipeQScoreRedis = recipeQScoreRedisRepository.findByRecipeId(recipeId);

        RecipeQScoreRedis recipeQScoreRedis;
        if(optionalRecipeQScoreRedis.isPresent()){
            recipeQScoreRedis = optionalRecipeQScoreRedis.get();
            recipeQScoreRedisRepository.delete(recipeQScoreRedis);
            recipeQScoreRedis.addScore();
        }else{
            recipeQScoreRedis = RecipeQScoreRedis.builder()
                    .recipeId(recipeId)
                    .score(1L)
                    .build();
        }

        recipeQScoreRedisRepository.save(recipeQScoreRedis);
        List<RecipeQScoreRedis> all = recipeQScoreRedisRepository.findAll();
        for (RecipeQScoreRedis qScoreRedis : all) {
            log.info("recipeId={}, score = {}",qScoreRedis.getRecipeId() , qScoreRedis.getScore());
        }
    }

    @Transactional
    public void subQScore(Recipe recipe) {
        RecipeQScoreRedis recipeQScoreRedis = recipeQScoreRedisRepository.findByRecipeId(recipe.getId())
                .orElseThrow(RecipeQScoreNotFoundException::new);

        recipeQScoreRedisRepository.delete(recipeQScoreRedis);
        recipeQScoreRedis.subScore();
        recipeQScoreRedisRepository.save(recipeQScoreRedis);
        List<RecipeQScoreRedis> all = recipeQScoreRedisRepository.findAll();
        for (RecipeQScoreRedis qScoreRedis : all) {
            log.info("recipeId={}, score = {}",qScoreRedis.getRecipeId() , qScoreRedis.getScore());
        }
    }

    @Transactional
    public void deleteRecipeQScore(Recipe recipe){
        RecipeQScore recipeQScore = recipeQScoreRepository.findByRecipe(recipe).orElseThrow(RecipeQScoreNotFoundException::new);
        recipeQScoreRepository.delete(recipeQScore);

        Optional<RecipeQScoreRedis> recipeQScoreRedis = recipeQScoreRedisRepository.findByRecipeId(recipe.getId());
        if(recipeQScoreRedis.isPresent()){
            recipeQScoreRedisRepository.delete(recipeQScoreRedis.get());
        }
    }

    @Scheduled(fixedDelay = 300000)
    @Transactional
    public void reflectRecipeQScoreRedisToDB(){
        List<RecipeQScoreRedis> recipeQScoreRedisList = recipeQScoreRedisRepository.findAll();
        recipeQScoreRedisRepository.deleteAll();

        List<RecipeQScoreRedisDto> updateList = new ArrayList<>();
        List<RecipeQScoreRedisDto> insertList = new ArrayList<>();

        for(RecipeQScoreRedis recipeQScoreRedis : recipeQScoreRedisList){
            Optional<RecipeQScore> optionalRecipeQScore = recipeQScoreRepository.findFromRedis(recipeQScoreRedis.getRecipeId());

            if(optionalRecipeQScore.isPresent()){
                updateList.add(
                        RecipeQScoreRedisDto.builder()
                                .id(optionalRecipeQScore.get().getId())
                                .score(optionalRecipeQScore.get().getScore() + recipeQScoreRedis.getScore())
                                .build()
                );
            }else{
                insertList.add(
                        RecipeQScoreRedisDto.builder()
                                .recipeId(recipeQScoreRedis.getRecipeId())
                                .score(recipeQScoreRedis.getScore())
                                .build()
                );
            }
        }

        jdbcRecipeQScoreRepository.insertRecipeQScoreFromRedis(insertList);
        jdbcRecipeQScoreRepository.updateRecipeQScoreFromRedis(updateList);
    }
}
