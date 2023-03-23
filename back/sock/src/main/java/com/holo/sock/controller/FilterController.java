package com.holo.sock.controller;

import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.ListResult;
import com.holo.sock.dto.filter.FilterDto;
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
    public ListResult<FilterDto> flavorList(){
        List<FilterDto> responseDto = filterService.flavorList();
        return responseService.getListResult(responseDto);
    }

    @GetMapping("/types")
    public ListResult<FilterDto> typeList(){
        List<FilterDto> responseDto = filterService.typeList();
        return responseService.getListResult(responseDto);
    }

}
