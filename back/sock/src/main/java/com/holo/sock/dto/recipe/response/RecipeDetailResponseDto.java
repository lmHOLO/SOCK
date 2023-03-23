package com.holo.sock.dto.recipe.response;

import com.holo.sock.dto.recipeImage.RecipeImageDto;
import com.holo.sock.dto.tag.TagDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.member.badge.Grade;
import com.holo.sock.entity.member.badge.SBTI;
import com.holo.sock.entity.recipe.Recipe;
import com.holo.sock.entity.recipe.Tag;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RecipeDetailResponseDto {
    private Long recipeId;

    private LocalDateTime createdDate;
    private String title;
    private Long writerId;
    private String writerNickname;
    private String writerImage;

    private SBTI sbti;
    private Grade grade;

    // 레시피 이미지 추가
    private List<RecipeImageDto> recipeImages;

    private String content;

    // 태그(과자) , 좋아요, 총 좋아요 수
    private List<TagDto> tag;

    private boolean like;
    private long totalLikes;
// tagDto 필요
    public RecipeDetailResponseDto(Recipe recipe, List<TagDto> tag,List<RecipeImageDto> images, boolean like,Long totalLikes) {
        this.recipeId = recipe.getId();
        this.createdDate = recipe.getCreateDate();
        this.title = recipe.getTitle();
        this.writerId =recipe.getWriter().getId();
        this.writerNickname = recipe.getWriter().getNickname();
        this.writerImage = recipe.getWriter().getProfile().getImage();
        this.sbti = recipe.getWriter().getSbti();
        this.grade = recipe.getWriter().getGrade();
        this.recipeImages = images;
        this.content = recipe.getContent();
        this.tag = tag;
        this.like = like;
        this.totalLikes = totalLikes;
    }
}
