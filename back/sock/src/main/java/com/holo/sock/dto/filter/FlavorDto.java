package com.holo.sock.dto.filter;

import com.holo.sock.entity.snack.Flavor;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class FlavorDto {

    private Long id;
    private String name;

    public static FlavorDto create(Flavor flavor){
        return FlavorDto.builder()
                .id(flavor.getId())
                .name(flavor.getName())
                .build();
    }
}
