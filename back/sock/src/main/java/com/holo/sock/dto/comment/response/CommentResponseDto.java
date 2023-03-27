package com.holo.sock.dto.comment.response;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.member.badge.Grade;
import com.holo.sock.entity.recipe.Comment;
import com.holo.sock.entity.member.badge.SBTI;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class CommentResponseDto {
    private Long memberId;
    private String nickname;
    private String memberImage;
    private Long commentId;
    private String content;
    private LocalDateTime createdDate;
    private boolean myComment;

    private SBTI sbti;
    private Grade grade;


    public void checkMyComment(Member member){
        if(memberId == member.getId()) this.myComment = true;
    }

    public CommentResponseDto(Comment comment) {
        this.memberId = comment.getWriter().getId();
        this.nickname = comment.getWriter().getNickname();
        this.memberImage = comment.getWriter().getProfile().getImage();
        this.commentId = comment.getId();
        this.content = comment.getContent();
        this.createdDate = comment.getCreateDate();
        this.sbti= comment.getWriter().getSbti();
        this.grade=comment.getWriter().getGrade();
    }

}
