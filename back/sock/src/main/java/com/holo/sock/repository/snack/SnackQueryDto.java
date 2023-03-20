package com.holo.sock.repository.snack;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class SnackQueryDto {

    private Long snackId;
    private String image;
    private String name;
    private int sumOfStarts;
    private int numberOfParticipants;
    private long score;
    private LocalDateTime createDate;
    private LocalDateTime lastModifiedDate;

    @QueryProjection
    public SnackQueryDto(Long snackId, String image, String name, int sumOfStarts, int numberOfParticipants, long score, LocalDateTime createDate, LocalDateTime lastModifiedDate) {
        this.snackId = snackId;
        this.image = image;
        this.name = name;
        this.sumOfStarts = sumOfStarts;
        this.numberOfParticipants = numberOfParticipants;
        this.score = score;
        this.createDate = createDate;
        this.lastModifiedDate = lastModifiedDate;
    }

}
