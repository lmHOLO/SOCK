package com.holo.sock.service.recommend;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recommend.Purchase;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.repository.recommend.PurchaseRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;

    @Transactional
    public void addCount(Member member, Snack snack){
        Optional<Purchase> optionalPurchase = purchaseRepository.findByMemberAndSnack(member, snack);
        if(optionalPurchase.isPresent()){
            Purchase purchase = optionalPurchase.get();
            purchase.addCount();
        } else {
            Purchase purchase = Purchase.builder()
                    .member(member)
                    .snack(snack)
                    .count(1)
                    .build();

            purchaseRepository.save(purchase);
        }
    }
}
