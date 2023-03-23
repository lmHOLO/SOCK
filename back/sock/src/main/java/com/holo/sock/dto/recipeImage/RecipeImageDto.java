package com.holo.sock.dto.recipeImage;

import com.holo.sock.entity.recipe.RecipeImage;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RecipeImageDto {
    private Long imageId;
    private String recipeImage;

    public RecipeImageDto(RecipeImage recipeImage) {
        this.imageId = recipeImage.getId();
        this.recipeImage = recipeImage.getName();
    }
}
