package com.holo.sock.dto.snack.response;

import com.holo.sock.entity.snack.Snack;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SnackWorldcupResponseDto {
    private Long snackId;
    private String image;
    private String name;

    public static SnackWorldcupResponseDto create(Snack snack){
        return SnackWorldcupResponseDto.builder()
                .snackId(snack.getId())
                .image(snack.getImage())
                .name(snack.getName())
                .build();
    }
}
