package com.holo.sock.dto.snack.request;

import com.holo.sock.entity.snack.Snack;
import com.holo.sock.entity.snack.Type;
import lombok.*;

import java.util.ArrayList;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegisterRequestDto {

    private String image;
    private String name;
    private Long type_id;
    private String flavor;

    public Snack toEntity(Type type){
        return Snack.builder()
                .name(name)
                .numberOfParticipants(0)
                .sumOfStars(0)
                .image(image)
                .type(type)
                .flavors(new ArrayList<>())
                .build();
    }
}
