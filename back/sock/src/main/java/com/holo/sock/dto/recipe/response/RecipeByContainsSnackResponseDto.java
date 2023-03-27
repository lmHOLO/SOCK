package com.holo.sock.dto.recipe.response;

import com.holo.sock.dto.recipeImage.RecipeImageDto;
import com.holo.sock.entity.recipe.Recipe;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RecipeByContainsSnackResponseDto {
    private Long recipeId;
    private String recipeTitle;
    private String recipeImage;

    public RecipeByContainsSnackResponseDto(Recipe recipe) {
        this.recipeId = recipe.getId();
        this.recipeTitle = recipe.getTitle();
        this.recipeImage = recipe.getImages().get(0).getName();
    }
}
