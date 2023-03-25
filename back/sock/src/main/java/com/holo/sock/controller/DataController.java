package com.holo.sock.controller;

import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.Result;
import com.holo.sock.dto.data.PurchaseDumpDto;
import com.holo.sock.dto.data.ReviewDumpDto;
import com.holo.sock.dto.data.SearchDumpDto;
import com.holo.sock.service.data.DataService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/data")
@RequiredArgsConstructor
public class DataController {

    private final ResponseService responseService;
    private final DataService dataService;

    @PostMapping("/purchase")
    public Result registerPurchase(@RequestBody List<PurchaseDumpDto> request){
        dataService.registerPurchase(request);
        return responseService.getSuccessResult();
    }

    @PostMapping("/review")
    public Result registerReview(@RequestBody List<ReviewDumpDto> request){
        dataService.registerReview(request);
        return responseService.getSuccessResult();
    }

    @PostMapping("/search")
    public Result registerSearch(@RequestBody List<SearchDumpDto> request){
        dataService.registerSearch(request);
        return responseService.getSuccessResult();
    }
}
