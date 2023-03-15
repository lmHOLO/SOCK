package com.holo.sock.entity.Member.Profile;

import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.Member.Member;
import com.holo.sock.entity.Snack.Snack;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class LikeSnack extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "likeSnack_id")
    private long Id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snack_id")
    private Snack snack;
}
