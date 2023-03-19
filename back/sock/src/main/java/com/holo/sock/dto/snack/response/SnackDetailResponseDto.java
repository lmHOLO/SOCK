package com.holo.sock.dto.snack.response;

import com.holo.sock.entity.snack.Snack;
import lombok.*;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SnackDetailResponseDto {
    private String image;
    private String name;
    private int sumOfStars;
    private int numberOfParticipants;

    private TypeInfoDto type;
    private List<FlavorInfoDto> flavors;
    private boolean like;
    private long totalLikes;

    public static SnackDetailResponseDto create(Snack snack, boolean like, long totalLikes){
        return SnackDetailResponseDto.builder()
                .image(snack.getImage())
                .name(snack.getName())
                .sumOfStars(snack.getSumOfStars())
                .numberOfParticipants(snack.getNumberOfParticipants())
                .type(new TypeInfoDto(snack.getType().getId(), snack.getType().getName()))
                .flavors(
                        snack.getFlavors()
                                .stream()
                                .map(s -> new FlavorInfoDto(s.getId(), s.getFlavor().getName()))
                                .collect(Collectors.toList())
                )
                .like(like)
                .totalLikes(totalLikes)
                .build();
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    private static class TypeInfoDto{
        private Long id;
        private String name;
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    private static class FlavorInfoDto{
        private Long id;
        private String name;
    }
}
