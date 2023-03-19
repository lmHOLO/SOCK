package com.holo.sock.dto.recipe.request;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.Comment;
import com.holo.sock.entity.recipe.Recipe;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegisterCommentRequestDto {
     private String content;

     public Comment toEntity(Member writer, Recipe recipe){
          return Comment.builder()
                  .writer(writer)
                  .recipe(recipe)
                  .content(content)
                  .build();
     }
}
