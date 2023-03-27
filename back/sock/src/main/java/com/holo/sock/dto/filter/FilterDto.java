package com.holo.sock.dto.filter;

import com.holo.sock.entity.snack.Flavor;
import com.holo.sock.entity.snack.Type;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class FilterDto {

    private Long id;
    private String name;

    public static FilterDto create(Flavor flavor){
        return FilterDto.builder()
                .id(flavor.getId())
                .name(flavor.getName())
                .build();
    }

    public static FilterDto create(Type type){
        return FilterDto.builder()
                .id(type.getId())
                .name(type.getName())
                .build();
    }
}
