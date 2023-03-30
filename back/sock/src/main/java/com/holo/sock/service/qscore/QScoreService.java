package com.holo.sock.service.qscore;

import com.holo.sock.dto.qscore.QScoreDto;
import com.holo.sock.entity.qscore.RecipeQScore;
import com.holo.sock.entity.qscore.SnackQScore;
import com.holo.sock.repository.qscore.RecipeQScoreRepository;
import com.holo.sock.repository.qscore.SnackQScoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QScoreService {

    private final RecipeQScoreRepository recipeQScoreRepository;
    private final SnackQScoreRepository snackQScoreRepository;

    public List<QScoreDto> topQScore(){
        Pageable pageable = PageRequest.of(0, 10);
        List<RecipeQScore> recipeQScores = recipeQScoreRepository.top10Recipe(pageable);
        List<SnackQScore> snackQScores = snackQScoreRepository.top10Snack(pageable);

        PriorityQueue<QScoreDto> pq = new PriorityQueue<>();
        for (RecipeQScore rqs : recipeQScores) {
            pq.offer(
                    QScoreDto.builder()
                            .id(rqs.getRecipe().getId())
                            .snackCheck(false)
                            .score(rqs.getScore())
                            .name(rqs.getRecipe().getTitle())
                            .build()
            );
        } 

        for (SnackQScore sqs : snackQScores) {
            pq.offer(
                    QScoreDto.builder()
                            .id(sqs.getSnack().getId())
                            .snackCheck(true)
                            .score(sqs.getScore())
                            .name(sqs.getSnack().getName())
                            .build()
            );
        }

        List<QScoreDto> result = new ArrayList<>();
        int count = 0;
        while(!pq.isEmpty() && count < 10){
            result.add(pq.poll());
            count++;
        }

        return result;
    }


}
