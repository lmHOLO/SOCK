package com.holo.sock.controller;

import com.holo.sock.common.annotation.LoginMember;
import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.ListResult;
import com.holo.sock.common.result.Result;
import com.holo.sock.dto.member.response.MemberSearchResponseDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final ResponseService responseService;
    private final MemberService memberService;

    @GetMapping
    public ListResult<MemberSearchResponseDto> searchMember(@RequestParam String nickname) {
        log.info("nickname:{}",nickname);
        List<MemberSearchResponseDto> searchMemberList = memberService.searchMember(nickname);
        return responseService.getListResult(searchMemberList);
    }


    @GetMapping("nickname")
    public Result isUniqueNickname(@RequestParam String nickname) {
        log.info("nickname: {}",nickname);
        return responseService.getSingleResult(memberService.isUniqueNickname(nickname));
    }

    @PostMapping("nickname")
    public Result modifyNickname(@RequestParam String nickname, @LoginMember Member member) {
        memberService.modifyNickname(nickname);
        return responseService.getSuccessResult();
    }



}
