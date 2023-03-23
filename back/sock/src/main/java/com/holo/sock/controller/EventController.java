package com.holo.sock.controller;

import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.ListResult;
import com.holo.sock.dto.event.response.SBTIQuestionResponseDto;
import com.holo.sock.service.event.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

}
