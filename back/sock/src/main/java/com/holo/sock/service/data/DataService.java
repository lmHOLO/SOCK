package com.holo.sock.service.data;

import com.holo.sock.dto.data.PurchaseDumpDto;
import com.holo.sock.repository.jdbc.JdbcRepository;
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

    private final JdbcRepository jdbcRepository;

    public void registerPurchase(List<PurchaseDumpDto> request){
        jdbcRepository.savePurchase(request);
    }
}
