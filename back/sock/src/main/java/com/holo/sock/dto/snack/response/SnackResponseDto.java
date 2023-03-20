package com.holo.sock.dto.snack.response;

import com.holo.sock.repository.snack.SnackQueryDto;
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

    public static SnackResponseDto create(SnackQueryDto dto, HashSet<Long> snackIdsWithLik){
        return SnackResponseDto.builder()
                .snackId(dto.getSnackId())
                .image(dto.getImage())
                .name(dto.getName())
                .sumOfStarts(dto.getSumOfStarts())
                .numberOfParticipants(dto.getNumberOfParticipants())
                .like(snackIdsWithLik.contains(dto.getSnackId()))
                .build();
    }
}
