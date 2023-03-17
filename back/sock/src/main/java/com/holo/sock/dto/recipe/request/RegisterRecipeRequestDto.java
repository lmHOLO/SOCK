package com.holo.sock.dto.recipe.request;

import com.holo.sock.entity.snack.Snack;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegisterRecipeRequestDto {
     private Long writerId;
     private List<String> images = new ArrayList<>();
     private String title;
     private List<Long> snackIds = new ArrayList<>();
     private String content;


}
