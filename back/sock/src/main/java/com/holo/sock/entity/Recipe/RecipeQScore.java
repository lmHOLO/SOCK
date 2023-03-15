package com.holo.sock.entity.Recipe;

import com.holo.sock.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Builder
public class RecipeQScore extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipeQscore_id")
    private long Id;

    @OneToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;
    private long score;
}
