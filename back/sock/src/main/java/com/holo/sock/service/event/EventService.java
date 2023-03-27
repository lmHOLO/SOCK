package com.holo.sock.service.event;

import com.holo.sock.dto.event.response.SBTIQuestionResponseDto;
import com.holo.sock.dto.snack.response.SnackWorldcupResponseDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.member.badge.SBTI;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.repository.event.SBTIQuestionRepository;
import com.holo.sock.repository.snack.SnackRepository;
import com.holo.sock.service.member.GradeService;
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
    private final SnackRepository snackRepository;

    private final GradeService gradeService;

    public List<SBTIQuestionResponseDto> sbtiQuestionList(){
         return sbtiQuestionRepository.findAll().stream()
                .map(SBTIQuestionResponseDto::create)
                .collect(Collectors.toList());
    }

    @Transactional
    public String sbtiAnswer(Member loginMember, List<Integer> answers){
        int score = 0;

        for(int i = 0; i < 4; i++){
            int ans = answers.get(i);
            score += (ans << i);
        }

        SBTI[] sbtis = SBTI.values();
        SBTI sbti = sbtis[score];

        loginMember.changeSBTI(sbti);
        gradeService.addExp(loginMember, gradeService.PARTICIPATE_CHALLENGE);

        return sbti.toString();
    }

    public List<SnackWorldcupResponseDto> worldcupSnackList(){
        List<Snack> snacks = snackRepository.worldcupRandomSnackList();
        return snacks.stream()
                .map(SnackWorldcupResponseDto::create)
                .collect(Collectors.toList());
    }

}
