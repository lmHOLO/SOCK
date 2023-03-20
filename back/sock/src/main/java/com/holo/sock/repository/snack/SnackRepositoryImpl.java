package com.holo.sock.repository.snack;

import com.holo.sock.dto.snack.request.SearchSnackListRequestDto;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
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

public class SnackRepositoryImpl implements SnackRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    public SnackRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<SnackQueryDto> findSnacks(SearchSnackListRequestDto requestDto, Pageable pageable) {
        String snackName = requestDto.getKeyword();
        String flavorName = requestDto.getFlavor();
        String typeName = requestDto.getType();
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
                        typeEq(typeName),
                        flavorEq(flavorName)
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
                        typeEq(typeName),
                        flavorEq(flavorName)
                )
                .fetchOne();

        return new PageImpl<>(content, pageable, count);
    }

    private BooleanExpression nameContain(String snackName){
        return snackName != null ? snack.name.contains(snackName) : null;
    }

    private BooleanExpression typeEq(String typeName){
        return typeName != null ? snack.type.name.eq(typeName) : null;
    }

    private BooleanExpression flavorEq(String flavorName){
        return flavorName != null ? flavor.name.eq(flavorName) : null;
    }

    private OrderSpecifier orderCond(String arrange){
        if(arrange == null || arrange.equals("recent")) return snack.lastModifiedDate.desc();
        else return snackQScore.score.nullif(0L).desc();
    }

}
