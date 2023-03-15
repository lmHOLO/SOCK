package com.holo.sock.entity.common;

import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.Recipe.Recipe;
import com.holo.sock.entity.Snack.Snack;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Tag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private long Id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @OneToOne
    @JoinColumn(name = "snack_id")
    private Snack snack;
}
