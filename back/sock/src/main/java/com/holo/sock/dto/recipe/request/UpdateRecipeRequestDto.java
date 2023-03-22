package com.holo.sock.dto.recipe.request;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UpdateRecipeRequestDto {
    private String title;
    private String content;
    private List<String> images = new ArrayList<>();
    // 태그
    private List<Long> snackIds = new ArrayList<>();

}
