package com.holo.sock.dto.recipe.response;

import com.holo.sock.entity.recipe.LikeRecipe;
import com.holo.sock.entity.recipe.Recipe;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class LikeRecipeResponseDto {
    private Long recipeId;
    private String image;

    public static LikeRecipeResponseDto createFromLikeRecipe(Recipe recipe){
        return LikeRecipeResponseDto.builder()
                .recipeId(recipe.getId())
                .image(recipe.getImages().get(0).getName())
                .build();
    }
}
