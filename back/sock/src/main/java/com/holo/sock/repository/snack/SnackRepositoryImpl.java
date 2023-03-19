package com.holo.sock.repository.snack;

import com.holo.sock.dto.snack.request.SearchSnackListRequestDto;
import com.holo.sock.entity.snack.QFlavor;
import com.holo.sock.entity.snack.QSnackFlavor;
import com.holo.sock.entity.snack.QType;
import com.holo.sock.entity.snack.Snack;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;

import java.util.List;

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
    public Page<Snack> findSnacks(SearchSnackListRequestDto requestDto, Pageable pageable) {
        String snackName = requestDto.getKeyword();
        String flavorName = requestDto.getFlavor();
        String typeName = requestDto.getType();

        List<Snack> content = queryFactory.selectFrom(snack).distinct()
                .join(snack.type, type)
                .join(snackFlavor).on(snackFlavor.snack.eq(snack))
                .join(snackFlavor.flavor, flavor)
                .where(
                        nameContain(snackName),
                        typeEq(typeName),
                        flavorEq(flavorName)
                )
                .orderBy(snack.id.asc())
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

}
