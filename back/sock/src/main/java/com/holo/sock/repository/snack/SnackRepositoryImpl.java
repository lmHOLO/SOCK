package com.holo.sock.repository.snack;

import com.holo.sock.common.jpqltemplates.MySqlJpaTemplates;
import com.holo.sock.dto.snack.request.SearchSnackListRequestDto;
import com.holo.sock.entity.snack.Snack;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;

import java.util.List;

import static com.holo.sock.entity.qscore.QSnackQScore.snackQScore;
import static com.holo.sock.entity.snack.QFlavor.*;
import static com.holo.sock.entity.snack.QSnack.snack;
import static com.holo.sock.entity.snack.QSnackFlavor.*;
import static com.holo.sock.entity.snack.QType.type;

@Slf4j
public class SnackRepositoryImpl implements SnackRepositoryCustom{

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    public SnackRepositoryImpl(EntityManager em) {
        this.em = em;
        this.queryFactory = new JPAQueryFactory(this.em);
    }

    @Override
    public Page<SnackQueryDto> findSnacks(SearchSnackListRequestDto requestDto, Pageable pageable) {
        String snackName = requestDto.getKeyword();
        List<String> flavors = requestDto.getFlavors();
        List<String> types = requestDto.getTypes();
        String arrange = requestDto.getArrange();

        List<SnackQueryDto> content = queryFactory
                .select(new QSnackQueryDto(snack.id, snack.image, snack.name, snack.sumOfStars, snack.numberOfParticipants, snackQScore.score, snack.createDate, snack.lastModifiedDate)).distinct()
                .from(snack)
                .join(snack.type, type)
                .join(snackFlavor).on(snackFlavor.snack.eq(snack))
                .join(snackFlavor.flavor, flavor)
                .leftJoin(snackQScore).on(snackQScore.snack.id.eq(snack.id))
                .where(
                        nameContain(snackName),
                        typeEq(types),
                        flavorEq(flavors)
                )
                .orderBy(orderCond(arrange))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = queryFactory.select(snack.countDistinct())
                .from(snack)
                .join(snack.type, type)
                .join(snackFlavor).on(snackFlavor.snack.eq(snack))
                .join(snackFlavor.flavor, flavor)
                .where(
                        nameContain(snackName),
                        typeEq(types),
                        flavorEq(flavors)
                )
                .fetchOne();

        return new PageImpl<>(content, pageable, count);
    }

    @Override
    public List<Snack> findSimilarSnacks(List<Long> typeIds, List<Long> flavorIds, Long snackId) {
        JPAQuery<Snack> query = new JPAQuery<>(em, MySqlJpaTemplates.DEFAULT);

        return query.from(snack).distinct()
                .join(snack.type, type).fetchJoin()
                .join(snackFlavor).on(snackFlavor.snack.eq(snack))
                .join(snackFlavor.flavor, flavor)
                .where(snack.type.id.in(typeIds).or(flavor.id.in(flavorIds)).and(snackNe(snackId)))
                .orderBy(NumberExpression.random().asc())
                .limit(5)
                .fetch();
    }

    private BooleanExpression nameContain(String snackName){
        return snackName != null ? snack.name.contains(snackName) : null;
    }

    private BooleanExpression typeEq(List<String> types){
        if(types == null || types.size() == 0) return null;

        BooleanExpression result = snack.type.name.eq(types.get(0));
        for(int i = 1; i < types.size(); i++){
            result = result.or(snack.type.name.eq(types.get(i)));
        }

        return result;
    }

    private BooleanExpression flavorEq(List<String> flavors){
        if(flavors == null || flavors.size() == 0) return null;

        BooleanExpression result = flavor.name.eq(flavors.get(0));
        for(int i = 1; i < flavors.size(); i++){
            result = result.or(flavor.name.eq(flavors.get(i)));
        }

        return result;
    }

    private OrderSpecifier orderCond(String arrange){
        if(arrange == null || arrange.equals("recent")) return snack.lastModifiedDate.desc();
        else return snackQScore.score.nullif(0L).desc();
    }

    private BooleanExpression snackNe(Long snackId){
        return snackId != null ? snack.id.ne(snackId) : null;
    }

}
