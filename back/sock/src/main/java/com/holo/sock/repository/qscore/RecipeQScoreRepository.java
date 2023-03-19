package com.holo.sock.repository.qscore;

import com.holo.sock.entity.qscore.RecipeQScore;
import com.holo.sock.entity.recipe.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecipeQScoreRepository extends JpaRepository<RecipeQScore,Long> {
    Optional<RecipeQScore> findByRecipe(Recipe recipe);
}
