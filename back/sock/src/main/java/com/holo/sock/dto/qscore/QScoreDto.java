package com.holo.sock.dto.qscore;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class QScoreDto implements Comparable<QScoreDto>{
    private Long id;
    private boolean snackCheck;
    private long score;
    private String name;

    @Override
    public int compareTo(QScoreDto o) {
        if(this.score - o.score >= 0) return -1;
        else return 1;
    }
}
