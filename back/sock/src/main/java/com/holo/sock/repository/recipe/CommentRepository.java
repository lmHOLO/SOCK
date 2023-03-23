package com.holo.sock.repository.recipe;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.Comment;
import com.holo.sock.entity.recipe.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    Optional<Comment> findByWriterAndIdAndRecipe(Member member,Long id, Recipe recipe);

    @Query(value = "select c from Comment c join fetch c.writer w where c.recipe.id = :recipeId",
    countQuery = "select count(c) from Comment c where c.recipe.id =:recipeId")
    Page<Comment> findByRecipeId(@Param("recipeId") Long recipeId , Pageable pageable);

    List<Comment> findAllByRecipe(Recipe recipe);
}
