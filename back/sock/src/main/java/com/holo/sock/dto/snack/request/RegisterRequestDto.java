package com.holo.sock.dto.snack.request;

import com.holo.sock.entity.snack.Snack;
import com.holo.sock.entity.snack.Type;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class RegisterRequestDto {
    private Long id;
    private String create_date;
    private int number_of_participants;
    private int sum_of_starts;
    private String last_modified_date;
    private String image;
    private String name;
    private Long type_id;

    public Snack toEntity(Type type){
        return Snack.builder()
                .name(name)
                .numberOfParticipants(0)
                .sumOfStars(0)
                .image(image)
                .type(type)
                .build();
    }
}
