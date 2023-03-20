package com.holo.sock.repository.snack;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.snack.Review;
import com.holo.sock.entity.snack.Snack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByWriterAndSnack(Member member, Snack snack);

    boolean existsByWriterAndSnack(Member member, Snack snack);

    @Query("select r from Review r join fetch r.writer w where r.writer = :member and r.snack = :snack")
    Optional<Review> findWithWriter(Member member, Snack snack);

    @Query(value = "select r from Review r join fetch r.writer w where r.writer <> :member and r.snack = :snack order by r.createDate desc ",
        countQuery = "select count(r) from Review r join r.writer w where r.writer <> :member and r.snack = :snack")
    Page<Review> findReviewListWithWriter(Member member, Snack snack, Pageable pageable);
}
