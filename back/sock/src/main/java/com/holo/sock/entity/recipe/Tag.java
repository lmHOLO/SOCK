package com.holo.sock.entity.recipe;

import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.snack.Snack;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Tag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @OneToOne
    @JoinColumn(name = "snack_id")
    private Snack snack;
}
