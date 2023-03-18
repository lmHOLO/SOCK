package com.holo.sock.repository.snack;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.snack.Review;
import com.holo.sock.entity.snack.Snack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByWriterAndSnack(Member member, Snack snack);
}
