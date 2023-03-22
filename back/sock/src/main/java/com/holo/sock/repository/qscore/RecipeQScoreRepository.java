package com.holo.sock.repository.qscore;

import com.holo.sock.entity.qscore.RecipeQScore;
import com.holo.sock.entity.recipe.Recipe;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeQScoreRepository extends JpaRepository<RecipeQScore,Long> {
    Optional<RecipeQScore> findByRecipe(Recipe recipe);

    @Query("select rqs from RecipeQScore rqs join fetch rqs.recipe r order by rqs.score desc, r.id asc")
    List<RecipeQScore> top10Recipe(Pageable pageable);
}
