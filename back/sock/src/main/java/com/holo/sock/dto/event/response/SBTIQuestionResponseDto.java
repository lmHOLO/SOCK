package com.holo.sock.dto.event.response;

import com.holo.sock.entity.event.SBTIQuestion;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SBTIQuestionResponseDto {

    private Long id;

    private String question;

    private String answer1;

    private String answer2;

    public static SBTIQuestionResponseDto create(SBTIQuestion sbtiQuestion){
        return SBTIQuestionResponseDto.builder()
                .id(sbtiQuestion.getId())
                .question(sbtiQuestion.getQuestion())
                .answer1(sbtiQuestion.getAnswer1())
                .answer2(sbtiQuestion.getAnswer2())
                .build();
    }
}
