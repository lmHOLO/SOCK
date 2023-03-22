package com.holo.sock.entity.recipe;

import com.holo.sock.dto.recipe.request.UpdateRecipeRequestDto;
import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.member.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Recipe extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private Long id;

    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private Member writer;

    private String content;

    @OneToMany(mappedBy = "recipe",cascade = CascadeType.ALL)
    List<RecipeImage> images = new ArrayList<>();


    public void updateRecipe(String title, String content, List<RecipeImage> images) {
        this.title = title;
        this.content = content;
        this.images = images;
    }
}
