package com.holo.sock.controller;

import com.holo.sock.common.annotation.LoginMember;
import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.Result;
import com.holo.sock.common.result.SingleResult;
import com.holo.sock.dto.member.request.MemberModifyRequestDto;
import com.holo.sock.dto.member.response.MemberDetailResponseDto;
import com.holo.sock.dto.member.response.MemberSearchResponseDto;
import com.holo.sock.dto.member.request.MemberPreferenceRequestDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.service.member.MemberService;
import com.holo.sock.service.recommend.PreferenceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final ResponseService responseService;
    private final MemberService memberService;
    private final PreferenceService preferenceService;

    @GetMapping
    public SingleResult<MemberDetailResponseDto> getMyDetail(@LoginMember Member member) {
        return responseService.getSingleResult(memberService.getMemberDetail(member.getId()));
    }

    @PutMapping
    public Result modifyMember(@RequestBody MemberModifyRequestDto memberModifyDto, @LoginMember Member member) {
        memberService.modifyMember(memberModifyDto, member);
        return responseService.getSuccessResult();
    }

    @GetMapping("{memberId}")
    public SingleResult<MemberDetailResponseDto> getMemberDetail(@PathVariable Long memberId) {
        return responseService.getSingleResult(memberService.getMemberDetail(memberId));
    }

    @GetMapping("search")
    public SingleResult<Page<MemberSearchResponseDto>> searchMember(@RequestParam String nickname,
                                                                    @LoginMember Member member,
                                                                    @PageableDefault(size = 10) Pageable pageable) {
        log.info("nickname:{}", nickname);
        Page<MemberSearchResponseDto> searchMember = memberService.searchMemberList(member,nickname,pageable);
        return responseService.getSingleResult(searchMember);
    }

    @GetMapping("nickname")
    public Result isUniqueNickname(@RequestParam String nickname) {
        log.info("nickname: {}", nickname);
        return responseService.getSingleResult(memberService.isUniqueNickname(nickname));
    }

    @PostMapping("preference")
    public Result registerPreference(@LoginMember Member member, @RequestBody List<MemberPreferenceRequestDto> preferenceList) {
        preferenceService.registerPreferences(member,preferenceList);
        return responseService.getSuccessResult();
    }
}
