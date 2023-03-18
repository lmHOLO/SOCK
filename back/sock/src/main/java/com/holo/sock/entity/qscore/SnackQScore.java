package com.holo.sock.entity.qscore;

import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.snack.Snack;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@Table(name = "snack_qscore")
public class SnackQScore extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "snack_qscore_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "snack_id")
    private Snack snack;

    // 좋아요수 + 검색수 + 구매링크 클릭수
    private long score;

    public void addScore(){
        score++;
    }
}
