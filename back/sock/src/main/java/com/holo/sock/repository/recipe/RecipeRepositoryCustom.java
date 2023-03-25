package com.holo.sock.repository.recipe;

import com.holo.sock.entity.recipe.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RecipeRepositoryCustom {
    List<Recipe> findRecipesByContainsSnack(Long snackId,Long recipeId);

    Page<Recipe> findRecipesListByKeywordAndArrange(String keyword, String arrange, Long memberId, Pageable pageable);
}

