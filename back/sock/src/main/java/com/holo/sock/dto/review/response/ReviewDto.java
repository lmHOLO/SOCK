package com.holo.sock.dto.review.response;

import com.holo.sock.entity.member.badge.Grade;
import com.holo.sock.entity.member.badge.SBTI;
import com.holo.sock.entity.snack.Review;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ReviewDto {

    private Long reviewId;
    private String content;
    private int star;
    private WriterDto writer;
    private LocalDateTime createdDate;


    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    public static class WriterDto{
        private Long writerId;
        private String nickname;
        private String image;
        private SBTI sbti;
        private Grade grade;
    }

    public static ReviewDto create(Review review){
        return ReviewDto.builder()
                .reviewId(review.getId())
                .content(review.getContent())
                .star(review.getStar())
                .writer(
                        new WriterDto(
                                review.getWriter().getId(),
                                review.getWriter().getNickname(),
                                review.getWriter().getProfile().getImage(),
                                review.getWriter().getSbti(),
                                review.getWriter().getGrade()
                        )
                )
                .createdDate(review.getCreateDate())
                .build();
    }
}
