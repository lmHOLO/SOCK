package com.holo.sock.controller;

import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.ListResult;
import com.holo.sock.common.result.SingleResult;
import com.holo.sock.dto.event.response.SBTIQuestionResponseDto;
import com.holo.sock.service.event.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
public class EventController {

    private final ResponseService responseService;
    private final EventService eventService;

    @GetMapping("/sbti")
    public ListResult<SBTIQuestionResponseDto> sbtiQuestionList(){
        List<SBTIQuestionResponseDto> responseDto = eventService.sbtiQuestionList();
        return responseService.getListResult(responseDto);
    }

    @PostMapping("/sbti")
    public SingleResult<String> sbtiAnswer(@RequestBody List<Integer> answers){
        for (Integer answer : answers) {
            log.info("ans = {}", answer);
        }

        String sbti = eventService.sbtiAnswer(answers);
        return responseService.getSingleResult(sbti);
    }
}
