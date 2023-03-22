package com.holo.sock.repository.qscore;

import com.holo.sock.entity.qscore.SnackQScore;
import com.holo.sock.entity.snack.Snack;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SnackQScoreRepository extends JpaRepository<SnackQScore, Long> {

    Optional<SnackQScore> findBySnack(Snack snack);

    @Query("select sqs from SnackQScore sqs join fetch sqs.snack s order by sqs.score desc, s.id asc")
    List<SnackQScore> top10Snack(Pageable pageable);
}
