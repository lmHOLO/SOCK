package com.holo.sock.service.qscore;

import com.holo.sock.dto.redis.SnackQScoreRedisDto;
import com.holo.sock.entity.qscore.SnackQScore;
import com.holo.sock.entity.redis.SnackQScoreRedis;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.exception.snackqscore.SnackQScoreNotFoundException;
import com.holo.sock.repository.jdbc.JdbcSnackQScoreRepository;
import com.holo.sock.repository.qscore.SnackQScoreRepository;
import com.holo.sock.repository.redis.SnackQScoreRedisRepository;
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
public class SnackQScoreService {

    private final SnackQScoreRedisRepository snackQScoreRedisRepository;
    private final SnackQScoreRepository snackQScoreRepository;
    private final JdbcSnackQScoreRepository jdbcSnackQScoreRepository;

    @Transactional
    public void addQScore(Snack snack){
        Long snackId = snack.getId();
        Optional<SnackQScoreRedis> optionalSnackQScoreRedis = snackQScoreRedisRepository.findBySnackId(snackId);

        SnackQScoreRedis snackQScoreRedis;
        if(optionalSnackQScoreRedis.isPresent()){
            snackQScoreRedis = optionalSnackQScoreRedis.get();
            snackQScoreRedisRepository.delete(snackQScoreRedis);
            snackQScoreRedis.addScore();
        }
        else{
            snackQScoreRedis = SnackQScoreRedis.builder()
                    .snackId(snackId)
                    .score(1L)
                    .build();
        }

        snackQScoreRedisRepository.save(snackQScoreRedis);
    }

    @Transactional
    public void subQScore(Snack snack){
        SnackQScoreRedis snackQScoreRedis = snackQScoreRedisRepository.findBySnackId(snack.getId())
                .orElseThrow(SnackQScoreNotFoundException::new);

        snackQScoreRedisRepository.delete(snackQScoreRedis);
        snackQScoreRedis.subScore();
        snackQScoreRedisRepository.save(snackQScoreRedis);
    }

    @Scheduled(fixedDelay = 300000)
    @Transactional
    public void reflectSnackQScoreRedisToDB(){
        List<SnackQScoreRedis> snackQScoreRedisList = snackQScoreRedisRepository.findAll();
        snackQScoreRedisRepository.deleteAll();

        List<SnackQScoreRedisDto> updateList = new ArrayList<>();
        List<SnackQScoreRedisDto> insertList = new ArrayList<>();

        for (SnackQScoreRedis snackQScoreRedis : snackQScoreRedisList) {
            Optional<SnackQScore> optionalSnackQScore =
                    snackQScoreRepository.findFromRedis(snackQScoreRedis.getSnackId());

            if(optionalSnackQScore.isPresent()){
                updateList.add(
                        SnackQScoreRedisDto.builder()
                                .id(optionalSnackQScore.get().getId())
                                .score(optionalSnackQScore.get().getScore() + snackQScoreRedis.getScore())
                                .build()
                );
            }
            else{
                insertList.add(
                        SnackQScoreRedisDto.builder()
                                .snackId(snackQScoreRedis.getSnackId())
                                .score(snackQScoreRedis.getScore())
                                .build()
                );
            }
        }

        jdbcSnackQScoreRepository.insertSnackQScoreFromRedis(insertList);
        jdbcSnackQScoreRepository.updateSnackQScoreFromRedis(updateList);
    }
}
