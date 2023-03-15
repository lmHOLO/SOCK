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
public class Review extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private long Id;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String content;
    private int star;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snack_id")
    private Snack snack;
}
