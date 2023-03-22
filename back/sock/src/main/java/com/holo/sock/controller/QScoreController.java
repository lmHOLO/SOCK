package com.holo.sock.controller;

import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.ListResult;
import com.holo.sock.dto.qscore.QScoreDto;
import com.holo.sock.service.qscore.QScoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/qscore")
@RequiredArgsConstructor
public class QScoreController {

    private final ResponseService responseService;
    private final QScoreService qScoreService;

    @GetMapping("/top")
    public ListResult<QScoreDto> top10QScore(){
        List<QScoreDto> responseDto = qScoreService.topQScore();
        return responseService.getListResult(responseDto);
    }

}
