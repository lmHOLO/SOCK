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

    private long score;

    public void addScore(){
        score++;
    }
}
