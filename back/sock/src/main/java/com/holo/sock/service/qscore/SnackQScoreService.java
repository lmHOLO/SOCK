package com.holo.sock.service.qscore;

import com.holo.sock.entity.qscore.SnackQScore;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.exception.snackqscore.SnackQScoreNotFoundException;
import com.holo.sock.repository.qscore.SnackQScoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SnackQScoreService {

    private final SnackQScoreRepository snackQScoreRepository;

    @Transactional
    public void addQScore(Snack snack){
        Optional<SnackQScore> optionalSnackQScore = snackQScoreRepository.findBySnack(snack);

        if(optionalSnackQScore.isPresent()){
            SnackQScore snackQScore = optionalSnackQScore.get();
            snackQScore.addScore();
        }else {
            SnackQScore snackQScore = SnackQScore.builder()
                    .snack(snack)
                    .score(1L)
                    .build();

            try {
                snackQScoreRepository.save(snackQScore);
            } catch (DataIntegrityViolationException e){
                SnackQScore duplicationSnackQScore = snackQScoreRepository.findBySnack(snack).get();
                duplicationSnackQScore.addScore();
            }

        }
    }

    @Transactional
    public void subQScore(Snack snack){
        SnackQScore snackQScore = snackQScoreRepository.findBySnack(snack)
                .orElseThrow(SnackQScoreNotFoundException::new);

        snackQScore.subScore();
    }
}
