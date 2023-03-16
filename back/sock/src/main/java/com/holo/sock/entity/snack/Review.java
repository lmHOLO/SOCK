package com.holo.sock.entity.snack;

import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.member.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Review extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "writer_id")
    private Member writer;

    private String content;

    private int star;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snack_id")
    private Snack snack;
}
