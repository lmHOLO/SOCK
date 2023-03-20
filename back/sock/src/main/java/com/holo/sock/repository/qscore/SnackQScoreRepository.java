package com.holo.sock.repository.qscore;

import com.holo.sock.entity.qscore.SnackQScore;
import com.holo.sock.entity.snack.Snack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SnackQScoreRepository extends JpaRepository<SnackQScore, Long> {

    Optional<SnackQScore> findBySnack(Snack snack);
}
