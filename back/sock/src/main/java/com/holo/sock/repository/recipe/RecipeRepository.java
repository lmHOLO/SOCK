package com.holo.sock.repository.recipe;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long>,RecipeRepositoryCustom {

    Optional<Recipe> findByWriterAndId(Member member, Long id);

    @Query("select r from Recipe r join fetch r.writer w where r.id =:recipeId")
    Optional<Recipe> findFetchJoinById(@Param("recipeId") Long recipeId);



}
