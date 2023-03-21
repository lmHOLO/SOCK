package com.holo.sock.dto.recipe.response;

import com.holo.sock.entity.member.badge.Grade;
import com.holo.sock.entity.member.badge.SBTI;
import com.holo.sock.entity.recipe.Tag;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RecipeDetailResponseDto {
    private Long recipeId;

    private String title;
    private String writer;
    private String writerImage;

    private SBTI sbti;
    private Grade grade;

    private String content;

    // 태그(과자) , 좋아요, 총 좋아요 수
    private List<Tag> tag;

    private boolean like;
    private long totalLikes;



}
