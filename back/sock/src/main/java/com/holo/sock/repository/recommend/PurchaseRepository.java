package com.holo.sock.repository.recommend;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recommend.Purchase;
import com.holo.sock.entity.snack.Snack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    Optional<Purchase> findByMemberAndSnack(Member member, Snack snack);
}
