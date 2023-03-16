package com.holo.sock.controller;

import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.Result;
import com.holo.sock.dto.snack.request.RegisterRequestDto;
import com.holo.sock.service.SnackService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("snacks")
@RequiredArgsConstructor
public class SnackController {

    private final ResponseService responseService;
    private final SnackService snackService;

    @PostMapping
    public Result registerSnacks(@RequestBody List<RegisterRequestDto> requestDto){
        snackService.registerSnacks(requestDto);
        return responseService.getSuccessResult();
    }
}
