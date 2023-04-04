package com.holo.sock.controller;

import com.holo.sock.common.annotation.LoginMember;
import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.SingleResult;
import com.holo.sock.dto.theme.ThemeDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.service.theme.ThemeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/theme")
@RequiredArgsConstructor
public class ThemeController {

    private final ResponseService responseService;
    private final ThemeService themeService;

    @GetMapping
    public SingleResult<Page<ThemeDto>> themeSnackList(@LoginMember Member member, @RequestParam("theme") String theme,
                                                       @PageableDefault(size = 10) Pageable pageable){
        Page<ThemeDto> requestDto = themeService.themeSnackList(member, theme, pageable);
        return responseService.getSingleResult(requestDto);
    }
}
