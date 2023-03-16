package com.holo.sock.dto.snack.response;

import com.holo.sock.entity.snack.Snack;
import lombok.*;
import org.springframework.security.core.parameters.P;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SnackDetailResponseDto {
    private String image;
    private String name;
    private int sumOfStars;
    private int numberOfParticipants;

    public static SnackDetailResponseDto create(Snack snack){
        return SnackDetailResponseDto.builder()
                .image(snack.getImage())
                .name(snack.getName())
                .sumOfStars(snack.getSumOfStars())
                .numberOfParticipants(snack.getNumberOfParticipants())
                .build();
    }
}
