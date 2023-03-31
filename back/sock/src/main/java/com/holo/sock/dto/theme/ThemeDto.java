package com.holo.sock.dto.theme;

import com.holo.sock.entity.theme.Theme;
import lombok.*;

import java.util.HashSet;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ThemeDto {
    private String theme;
    private Long snackId;
    private String name;
    private String image;
    private boolean like;

    public static ThemeDto create(Theme theme, HashSet<Long> snackIdsWithLik){
        return ThemeDto.builder()
                .theme(theme.getName())
                .snackId(theme.getSnack().getId())
                .name(theme.getSnack().getName())
                .image(theme.getSnack().getImage())
                .like(snackIdsWithLik.contains(theme.getSnack().getId()))
                .build();
    }
}
