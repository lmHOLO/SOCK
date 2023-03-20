package com.holo.sock.repository.recipe;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.Comment;
import com.holo.sock.entity.recipe.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    Optional<Comment> findByWriterAndIdAndRecipe(Member member,Long id, Recipe recipe);
}
