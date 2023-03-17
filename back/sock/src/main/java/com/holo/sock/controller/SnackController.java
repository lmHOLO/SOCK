package com.holo.sock.controller;

import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.Result;
import com.holo.sock.common.result.SingleResult;
import com.holo.sock.dto.snack.request.RegisterRequestDto;
import com.holo.sock.dto.snack.response.SnackDetailResponseDto;
import com.holo.sock.service.SnackService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/snacks")
@RequiredArgsConstructor
public class SnackController {

    private final ResponseService responseService;
    private final SnackService snackService;

    @PostMapping
    public Result registerSnacks(@RequestBody List<RegisterRequestDto> requestDto){
        snackService.registerSnacks(requestDto);
        return responseService.getSuccessResult();
    }

    @GetMapping("/{snack-id}")
    public SingleResult<SnackDetailResponseDto> searchSnackDetail(@PathVariable("snack-id") Long snackId){
        SnackDetailResponseDto responseDto = snackService.searchSnackDetail(snackId);
        return responseService.getSingleResult(responseDto);
    }
}
