package com.holo.sock.repository.recipe;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.LikeRecipe;
import com.holo.sock.entity.recipe.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRecipeRepository extends JpaRepository<LikeRecipe, Long> {
    boolean existsByMemberAndRecipe(Member member, Recipe recipe);
    Optional<LikeRecipe> findByMemberAndRecipe(Member member,Recipe recipe);
}
