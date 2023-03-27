package com.holo.sock.service.recommend;

import com.holo.sock.dto.redis.PurchaseRedisDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recommend.Purchase;
import com.holo.sock.entity.redis.PurchaseRedis;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.repository.jdbc.JdbcPurchaseRepository;
import com.holo.sock.repository.recommend.PurchaseRepository;
import com.holo.sock.repository.redis.PurchaseRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PurchaseService {

    private final PurchaseRedisRepository purchaseRedisRepository;
    private final PurchaseRepository purchaseRepository;
    private final JdbcPurchaseRepository jdbcPurchaseRepository;

    @Transactional
    public void addCount(Member member, Snack snack){
        Long memberId = member.getId();
        Long snackId = snack.getId();
        Optional<PurchaseRedis> optionalPurchaseRedis =
                purchaseRedisRepository.findByMemberIdAndSnackId(memberId, snackId);

        PurchaseRedis purchaseRedis;
        if(optionalPurchaseRedis.isPresent()){
            purchaseRedis = optionalPurchaseRedis.get();
            purchaseRedisRepository.delete(purchaseRedis);
            purchaseRedis.addCount();
        } else {
            purchaseRedis = PurchaseRedis.builder()
                    .memberId(memberId)
                    .snackId(snackId)
                    .count(1)
                    .build();
        }
        purchaseRedisRepository.save(purchaseRedis);
    }

    @Scheduled(fixedDelay = 300000)
    @Transactional
    public void reflectPurchaseRedisToDB(){
        List<PurchaseRedis> purchaseRedisList = purchaseRedisRepository.findAll();
        purchaseRedisRepository.deleteAll();

        List<PurchaseRedisDto> updateList = new ArrayList<>();
        List<PurchaseRedisDto> insertList = new ArrayList<>();

        for (PurchaseRedis purchaseRedis : purchaseRedisList) {
            Optional<Purchase> optionalPurchase =
                    purchaseRepository.findFromRedis(purchaseRedis.getMemberId(), purchaseRedis.getSnackId());

            if(optionalPurchase.isPresent()){
                updateList.add(
                        PurchaseRedisDto.builder()
                                .id(optionalPurchase.get().getId())
                                .count(optionalPurchase.get().getCount() + purchaseRedis.getCount())
                                .build()
                );
            }
            else{
                insertList.add(
                        PurchaseRedisDto.builder()
                                .memberId(purchaseRedis.getMemberId())
                                .snackId(purchaseRedis.getSnackId())
                                .count(purchaseRedis.getCount())
                                .build()
                );
            }
        }

        jdbcPurchaseRepository.updatePurchaseFromRedis(updateList);
        jdbcPurchaseRepository.insertPurchaseFromRedis(insertList);
    }


}
