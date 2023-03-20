package com.holo.sock.entity.qscore;

import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.recipe.Recipe;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@Table(name = "recipe_qscore")
public class RecipeQScore extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_qscore_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    private long score;

    public void addScore(){score++;}
}
