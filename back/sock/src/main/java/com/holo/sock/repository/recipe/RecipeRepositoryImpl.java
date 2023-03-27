package com.holo.sock.repository.recipe;

import com.holo.sock.common.jpqltemplates.MySqlJpaTemplates;
import com.holo.sock.entity.qscore.QRecipeQScore;
import com.holo.sock.entity.recipe.QRecipe;
import com.holo.sock.entity.recipe.QTag;
import com.holo.sock.entity.recipe.Recipe;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;

import static com.holo.sock.entity.qscore.QRecipeQScore.recipeQScore;
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

    @Override
    public Page<Recipe> findRecipesListByKeywordAndArrange(String keyword, String arrange, Long memberId, Pageable pageable) {
        List<Recipe> recipes = queryFactory.selectFrom(recipe)
                .leftJoin(recipeQScore).on(recipe.id.eq(recipeQScore.recipe.id))
                .where(
                        writerEq(memberId),
                        titleContain(keyword)
                )
                .orderBy(orderCond(arrange))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();
        Long count = queryFactory.select(recipe.count())
                .from(recipe)
                .leftJoin(recipeQScore).on(recipe.id.eq(recipeQScore.recipe.id))
                .where(
                        writerEq(memberId),
                        titleContain(keyword)
                )
                .fetchOne();
        return new PageImpl<>(recipes,pageable,count);

    }
    private BooleanExpression writerEq(Long memberId){
        return memberId != null ? recipe.writer.id.eq(memberId) : null;
    }
    private BooleanExpression titleContain(String keyword){
        return keyword != null ? recipe.title.contains(keyword) : null;
    }
    private OrderSpecifier orderCond(String arrange){
        if(arrange == null || arrange.equals("recent")) return recipe.createDate.desc();
        else return recipeQScore.score.nullif(0L).desc();
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
