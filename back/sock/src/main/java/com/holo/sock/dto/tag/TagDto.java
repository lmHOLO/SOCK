package com.holo.sock.dto.tag;

import com.holo.sock.entity.recipe.Tag;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class TagDto {
    private Long tagId;
    private Long recipeId;
    private Long snackId;
    private String snackName;
    private String image;

    public TagDto(Tag tag) {
        this.tagId = tag.getId();
        this.recipeId = tag.getRecipe().getId();
        this.snackId = tag.getSnack().getId();
        this.snackName = tag.getSnack().getName();
        this.image = tag.getSnack().getImage();
    }
}
