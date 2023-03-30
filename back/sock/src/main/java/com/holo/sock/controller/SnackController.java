package com.holo.sock.controller;

import com.holo.sock.common.annotation.LoginMember;
import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.ListResult;
import com.holo.sock.common.result.Result;
import com.holo.sock.common.result.SingleResult;
import com.holo.sock.dto.review.request.RegisterReviewRequestDto;
import com.holo.sock.dto.review.response.ReviewResponseDto;
import com.holo.sock.dto.snack.request.RegisterSnackRequestDto;
import com.holo.sock.dto.snack.request.SearchSnackListRequestDto;
import com.holo.sock.dto.snack.response.SnackDetailResponseDto;
import com.holo.sock.dto.snack.response.SnackPreferenceResponseDto;
import com.holo.sock.dto.snack.response.SnackResponseDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.service.snack.ReviewService;
import com.holo.sock.service.snack.SnackService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/snacks")
@RequiredArgsConstructor
public class SnackController {

    private final ResponseService responseService;
    private final SnackService snackService;
    private final ReviewService reviewService;

    @PostMapping
    public Result registerSnacks(@RequestBody List<RegisterSnackRequestDto> requestDto){
        snackService.registerSnacks(requestDto);
        return responseService.getSuccessResult();
    }

    @GetMapping
    public SingleResult<Page<SnackResponseDto>> snackList(@LoginMember Member member,
                                                          SearchSnackListRequestDto requestDto,
                                                          @PageableDefault(size = 10) Pageable pageable){
        log.info("requestDto={}",requestDto.getKeyword());
        Page<SnackResponseDto> responseDto = snackService.snackList(member, requestDto, pageable);
        return responseService.getSingleResult(responseDto);
    }

    @GetMapping("/like")
    public ListResult<SnackResponseDto> likeSnackList(@RequestParam("member-id") Long memberId){
        List<SnackResponseDto> responseDto = snackService.likeSnackList(memberId);
        return responseService.getListResult(responseDto);
    }

    @GetMapping("/{snack-id}")
    public SingleResult<SnackDetailResponseDto> searchSnackDetail(@LoginMember Member member,
                                                                  @PathVariable("snack-id") Long snackId){
        SnackDetailResponseDto responseDto = snackService.searchSnackDetail(member, snackId);
        return responseService.getSingleResult(responseDto);
    }

    @GetMapping("/{snack-id}/reviews")
    public SingleResult<ReviewResponseDto> reviewList(@LoginMember Member member, @PathVariable("snack-id") Long snackId,
                                                      @PageableDefault(size = 10) Pageable pageable){
        ReviewResponseDto responseDto = reviewService.reviewList(member, snackId, pageable);
        return responseService.getSingleResult(responseDto);
    }

    @PostMapping("/{snack-id}/reviews")
    public Result registerReview(@LoginMember Member member, @PathVariable("snack-id") Long snackId,
                                 @RequestBody RegisterReviewRequestDto requestDto){
        reviewService.registerReview(snackId, requestDto, member);
        return responseService.getSuccessResult();
    }

    @DeleteMapping("/{snack-id}/reviews")
    public Result deleteReview(@LoginMember Member member, @PathVariable("snack-id") Long snackId){
        reviewService.deleteReview(member, snackId);
        return responseService.getSuccessResult();
    }

    @PostMapping("/{snack-id}/purchase")
    public Result purchaseSnack(@LoginMember Member member, @PathVariable("snack-id") Long snackId){
        snackService.purchaseSnack(member, snackId);
        return responseService.getSuccessResult();
    }

    @PostMapping("/{snack-id}/like")
    public Result likeSnack(@LoginMember Member member, @PathVariable("snack-id") Long snackId){
        snackService.likeSnack(member, snackId);
        return responseService.getSuccessResult();
    }

    @DeleteMapping("/{snack-id}/like")
    public Result deleteLikeSnack(@LoginMember Member member, @PathVariable("snack-id") Long snackId){
        snackService.deleteLikeSnack(member, snackId);
        return responseService.getSuccessResult();
    }

    @GetMapping("/similar")
    public ListResult<SnackResponseDto> similarSnackList(@LoginMember Member member,
                                                         @RequestParam(value="snack-id", required = false) Long snackId,
                                                         @RequestParam(value="recipe-id", required = false) Long recipeId){
        List<SnackResponseDto> responseDto = snackService.similarSnackList(member, snackId, recipeId);
        return responseService.getListResult(responseDto);
    }

    @GetMapping("/preference")
    public ListResult<SnackPreferenceResponseDto> preferenceSnackList(){
        List<SnackPreferenceResponseDto> responseDto = snackService.preferenceSnackList();
        return responseService.getListResult(responseDto);
    }
}
