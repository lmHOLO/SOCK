package com.holo.sock.service.event;

import com.holo.sock.dto.event.response.SBTIQuestionResponseDto;
import com.holo.sock.entity.member.badge.SBTI;
import com.holo.sock.repository.event.SBTIQuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventService {

    private final SBTIQuestionRepository sbtiQuestionRepository;

    public List<SBTIQuestionResponseDto> sbtiQuestionList(){
         return sbtiQuestionRepository.findAll().stream()
                .map(SBTIQuestionResponseDto::create)
                .collect(Collectors.toList());
    }

    public String sbtiAnswer(List<Integer> answers){
        int score = 0;

        for(int i = 0; i < 4; i++){
            int ans = answers.get(i);
            score += (ans << i);
        }

        log.info("score = {}", score);
        SBTI[] sbtis = SBTI.values();
        return sbtis[score].toString();
    }


}
