package com.holo.sock.repository.recipe;

import com.holo.sock.entity.recipe.Recipe;
import com.holo.sock.entity.recipe.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {
    List<Tag> findAllByRecipe(Recipe recipe);
}
