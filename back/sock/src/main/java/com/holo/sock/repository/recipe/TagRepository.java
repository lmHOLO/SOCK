package com.holo.sock.repository.recipe;

import com.holo.sock.dto.tag.TagDto;
import com.holo.sock.entity.recipe.Recipe;
import com.holo.sock.entity.recipe.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag,Long> {

    List<Tag> findAllByRecipe(Recipe recipe);

    @Query("select t from Tag t join fetch t.snack s join fetch s.type ty where t.recipe.id = :recipeId")
    List<Tag> findByRecipeIdWithSnackAndType(Long recipeId);

    @Query("select t from Tag t join fetch t.snack where t.recipe=:recipe")
    List<Tag> findAllFetchJoinByRecipe(@Param("recipe") Recipe recipe);

}
