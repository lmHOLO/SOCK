package com.holo.sock.service.qscore;

import com.holo.sock.entity.qscore.RecipeQScore;
import com.holo.sock.entity.recipe.Recipe;
import com.holo.sock.exception.recipeqscore.RecipeQScoreNotFoundException;
import com.holo.sock.repository.qscore.RecipeQScoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecipeQScoreService {
    private final RecipeQScoreRepository recipeQScoreRepository;

    @Transactional
    public void addQScore(Recipe recipe){
        Optional<RecipeQScore> optionalRecipeQScore = recipeQScoreRepository.findByRecipe(recipe);

        if(optionalRecipeQScore.isPresent()){
            RecipeQScore recipeQScore = optionalRecipeQScore.get();
            recipeQScore.addScore();
        }else{
            RecipeQScore recipeQScore = RecipeQScore.builder()
                    .recipe(recipe)
                    .score(1L)
                    .build();

            try {
                recipeQScoreRepository.save(recipeQScore);
            } catch (DataIntegrityViolationException e){
                RecipeQScore duplicationRecipeQScore = recipeQScoreRepository.findByRecipe(recipe).get();
                duplicationRecipeQScore.addScore();
            }
        }
    }

    @Transactional
    public void subQScore(Recipe recipe) {
        RecipeQScore recipeQScore = recipeQScoreRepository.findByRecipe(recipe)
                .orElseThrow(RecipeQScoreNotFoundException::new);

        recipeQScore.subScore();
    }

    @Transactional
    public void deleteRecipeQScore(Recipe recipe){
        RecipeQScore recipeQScore = recipeQScoreRepository.findByRecipe(recipe).orElseThrow(RecipeQScoreNotFoundException::new);
        recipeQScoreRepository.delete(recipeQScore);
    }
}
