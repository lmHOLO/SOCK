package com.holo.sock.service.data;

import com.holo.sock.dto.data.PurchaseDumpDto;
import com.holo.sock.dto.data.ReviewDumpDto;
import com.holo.sock.dto.data.SearchDumpDto;
import com.holo.sock.repository.jdbc.JdbcDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class DataService {

    private final JdbcDataRepository jdbcDataRepository;

    public void registerPurchase(List<PurchaseDumpDto> request){
        jdbcDataRepository.savePurchase(request);
    }

    public void registerReview(List<ReviewDumpDto> request){
        jdbcDataRepository.saveReview(request);
    }

    public void registerSearch(List<SearchDumpDto> request){
        jdbcDataRepository.saveSearch(request);
    }
}
