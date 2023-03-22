package com.holo.sock.controller;

import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.ListResult;
import com.holo.sock.dto.filter.FlavorDto;
import com.holo.sock.service.filter.FilterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/filter")
@RequiredArgsConstructor
public class FilterController {

    private final ResponseService responseService;
    private final FilterService filterService;

    @GetMapping("/flavors")
    public ListResult<FlavorDto> flavorList(){
        List<FlavorDto> responseDto = filterService.flavorList();
        return responseService.getListResult(responseDto);
    }

}
