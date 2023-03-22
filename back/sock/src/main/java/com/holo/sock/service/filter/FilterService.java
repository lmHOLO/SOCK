package com.holo.sock.service.filter;

import com.holo.sock.dto.filter.FlavorDto;
import com.holo.sock.entity.snack.Flavor;
import com.holo.sock.repository.snack.FlavorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FilterService {

    private final FlavorRepository flavorRepository;

    public List<FlavorDto> flavorList(){
        return flavorRepository.findAll().stream()
                .map(FlavorDto::create)
                .collect(Collectors.toList());
    }

}
