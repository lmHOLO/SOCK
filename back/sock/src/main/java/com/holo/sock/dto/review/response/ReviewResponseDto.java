package com.holo.sock.dto.review.response;

import com.holo.sock.entity.snack.Review;
import lombok.*;
import org.springframework.data.domain.Page;

import java.util.Optional;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ReviewResponseDto {
    private ReviewDto myReview;
    private Page<ReviewDto> otherReviews;

    public ReviewResponseDto(Optional<Review> myReview, Page<Review> otherReviews){
        myReview.ifPresent(review -> this.myReview = ReviewDto.create(review));
        this.otherReviews = otherReviews.map(ReviewDto::create);
    }
}
