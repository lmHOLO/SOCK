package com.holo.sock.dto.review.request;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.snack.Review;
import com.holo.sock.entity.snack.Snack;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegisterReviewRequestDto {

    private String content;
    private int star;

    public Review toEntity(Member writer, Snack snack){
        return Review.builder()
                .writer(writer)
                .content(content)
                .star(star)
                .snack(snack)
                .build();
    }

}
