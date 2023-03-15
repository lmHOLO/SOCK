package com.holo.sock.entity.Snack;

import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.Member.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Purchase extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_id")
    private long Id;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;
    @OneToOne
    @JoinColumn(name = "snack_id")
    private Snack snack;
    private int count;
}
