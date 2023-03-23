package com.holo.sock.service.event;

import com.holo.sock.dto.event.response.SBTIQuestionResponseDto;
import com.holo.sock.entity.event.SBTIQuestion;
import com.holo.sock.repository.event.SBTIQuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
}
