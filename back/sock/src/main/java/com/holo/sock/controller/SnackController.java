package com.holo.sock.controller;

import com.holo.sock.common.annotation.LoginMember;
import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.Result;
import com.holo.sock.common.result.SingleResult;
import com.holo.sock.dto.snack.request.RegisterReviewRequestDto;
import com.holo.sock.dto.snack.request.RegisterSnackRequestDto;
import com.holo.sock.dto.snack.response.SnackDetailResponseDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.service.snack.SnackService;
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
    public Result registerSnacks(@RequestBody List<RegisterSnackRequestDto> requestDto){
        snackService.registerSnacks(requestDto);
        return responseService.getSuccessResult();
    }
    
    @GetMapping("/{snack-id}")
    public SingleResult<SnackDetailResponseDto> searchSnackDetail(@LoginMember Member member,
                                                                  @PathVariable("snack-id") Long snackId){
        SnackDetailResponseDto responseDto = snackService.searchSnackDetail(member, snackId);
        return responseService.getSingleResult(responseDto);
    }

    @PostMapping("/{snack-id}/reviews")
    public Result registerReview(@LoginMember Member member, @PathVariable("snack-id") Long snackId,
                                 @RequestBody RegisterReviewRequestDto requestDto){
        snackService.registerReview(snackId, requestDto, member);
        return responseService.getSuccessResult();
    }
}
