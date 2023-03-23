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
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    Optional<Recipe> findByWriterAndId(Member member, Long id);

    @Query("select r from Recipe r join fetch r.writer w where r.id =:recipeId")
    Optional<Recipe> findFetchJoinById(@Param("recipeId") Long recipeId);

    // 3/23 유사 레시피 추천 -ing
//    select *
//from recipe r join tag t on r.recipe_id=t.recipe_id
//join recipe_image ri on r.recipe_id = ri.recipe_id where t.snack_id = 2;

//    select t.snack_id as `스낵아이디`,r.recipe_id, ri.recipe_image_id , ri.name
//    from tag t join recipe r on t.recipe_id = r.recipe_id
//    join recipe_image ri on r.recipe_id = ri.recipe_id where t.snack_id=2;
    @Query("select r from Recipe r join Tag t on r.id = t.recipe.id where t.snack.id =:snackId")
    List<Recipe> findBySnackIdWithTag(@Param("snackId") Long snackId);

}
