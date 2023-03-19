package com.holo.sock.dto.snack.response;

import com.holo.sock.entity.snack.Snack;
import lombok.*;

import java.util.HashSet;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SnackResponseDto {
    private Long snackId;
    private String image;
    private String name;
    private int sumOfStarts;
    private int numberOfParticipants;
    private boolean like;

    public static SnackResponseDto create(Snack snack, HashSet<Long> snackIdsWithLike){
        return SnackResponseDto.builder()
                .snackId(snack.getId())
                .image(snack.getImage())
                .name(snack.getName())
                .sumOfStarts(snack.getSumOfStars())
                .numberOfParticipants(snack.getNumberOfParticipants())
                .like(snackIdsWithLike.contains(snack.getId()))
                .build();
    }
}
