package com.holo.sock.dto.recipe.response;

import com.holo.sock.entity.recipe.Recipe;
import lombok.*;

import java.util.HashSet;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RecipeSearchListResponseDto {

    private boolean myLikeCheck;
    private String writer;
    private Long recipeId;
    private String recipeTitle;
    private String recipeImage;

    public RecipeSearchListResponseDto(Recipe recipe, HashSet<Long> recipeIdsWithLike) {
        this.myLikeCheck = recipeIdsWithLike.contains(recipe.getId());
        this.writer = recipe.getWriter().getNickname();
        this.recipeId = recipe.getId();
        this.recipeTitle = recipe.getTitle();
        this.recipeImage = recipe.getImages().get(0).getName();
    }
}
