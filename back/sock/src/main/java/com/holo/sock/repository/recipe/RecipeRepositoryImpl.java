package com.holo.sock.repository.recipe;

import com.holo.sock.common.jpqltemplates.MySqlJpaTemplates;
import com.holo.sock.entity.recipe.QRecipe;
import com.holo.sock.entity.recipe.QTag;
import com.holo.sock.entity.recipe.Recipe;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.EntityManager;
import java.util.List;

import static com.holo.sock.entity.recipe.QRecipe.recipe;
import static com.holo.sock.entity.recipe.QTag.tag;

@Slf4j
public class RecipeRepositoryImpl implements RecipeRepositoryCustom{
    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public RecipeRepositoryImpl(EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(this.em);
    }
/**
 * select * from recipe r join tag t on r.recipe_id = t.recipe_id where t.snack_id =1;
 *
 *
 * -- (최종) 레시피 상세페이지에서 조회하는 경우
 * select * from recipe r join tag t on r.recipe_id = t.recipe_id where not r.recipe_id=3 and t.snack_id in (select t.snack_id from tag t where t.recipe_id =3);
 *
 * */
    @Override
    public List<Recipe> findRecipesByContainsSnack(Long snackId, Long recipeId) {
        JPAQuery<Recipe> query = new JPAQuery<>(em, MySqlJpaTemplates.DEFAULT);

        return query.from(recipe)
                .join(tag).on(tag.recipe.eq(recipe))
                .where(
                        snackIdEq(snackId),
                        recipeIdNe(recipeId)
                )
                .orderBy(NumberExpression.random().asc())
                .limit(5)
                .fetch();

    }
    private BooleanExpression snackIdEq(Long snackId){
        return snackId != null ? tag.snack.id.eq(snackId) : null;
    }
    private BooleanExpression recipeIdNe(Long recipeId){
        return recipeId != null ? recipe.id.ne(recipeId)
                .and(tag.snack.id.in
                        (JPAExpressions
                                .select(tag.snack.id)
                                .from(tag)
                                .where(tag.recipe.id.eq(recipeId)))) : null;
    }
}
