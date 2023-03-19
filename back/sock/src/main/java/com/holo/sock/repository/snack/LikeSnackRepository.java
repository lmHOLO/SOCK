package com.holo.sock.repository.snack;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.snack.LikeSnack;
import com.holo.sock.entity.snack.Snack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeSnackRepository extends JpaRepository<LikeSnack, Long> {

    boolean existsByMemberAndSnack(Member member, Snack snack);
    Optional<LikeSnack> findByMemberAndSnack(Member member, Snack snack);
}
