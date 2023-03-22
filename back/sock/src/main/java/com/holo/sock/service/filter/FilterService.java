package com.holo.sock.service.filter;

import com.holo.sock.dto.filter.FilterDto;
import com.holo.sock.repository.snack.FlavorRepository;
import com.holo.sock.repository.snack.TypeRepository;
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
    private final TypeRepository typeRepository;

    public List<FilterDto> flavorList(){
        return flavorRepository.findAll().stream()
                .map(FilterDto::create)
                .collect(Collectors.toList());
    }

    public List<FilterDto> typeList(){
        return typeRepository.findAll().stream()
                .map(FilterDto::create)
                .collect(Collectors.toList());
    }

}
