package com.holo.sock.entity.Snack;

import com.holo.sock.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class SnackQScore extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "snackQScore_id")
    private long Id;

    @OneToOne
    @JoinColumn(name = "snack_id")
    private Snack snack;
    private long score;
}
