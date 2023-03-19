package com.holo.sock.dto.recipe.request;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.Comment;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegisterCommentRequestDto {
     private String content;

     public Comment toEntity(Member writer){
          return Comment.builder()
                  .writer(writer)
                  .content(content)
                  .build();
     }
}
