package com.holo.sock.repository.recipe;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.LikeRecipe;
import com.holo.sock.entity.recipe.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRecipeRepository extends JpaRepository<LikeRecipe, Long> {
    boolean existsByMemberAndRecipe(Member member, Recipe recipe);
    Optional<LikeRecipe> findByMemberAndRecipe(Member member,Recipe recipe);
    List<LikeRecipe> findAllByRecipe(Recipe recipe);

    Long countByRecipe(Recipe recipe);

    List<LikeRecipe> findAllByMember(Member member);
    @Query("select lr.recipe.id from LikeRecipe lr where lr.recipe.id in :recipeIds and lr.member= :member")
    List<Long> findRecipeIdsWithLike(List<Long> recipeIds,Member member);
}
