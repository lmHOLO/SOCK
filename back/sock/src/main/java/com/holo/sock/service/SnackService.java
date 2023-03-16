package com.holo.sock.service;

import com.holo.sock.dto.snack.request.RegisterRequestDto;
import com.holo.sock.dto.snack.response.SnackDetailResponseDto;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.entity.snack.Type;
import com.holo.sock.exception.snack.SnackNotFoundException;
import com.holo.sock.exception.type.TypeNotFoundException;
import com.holo.sock.repository.SnackRepository;
import com.holo.sock.repository.TypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SnackService {

    private final SnackRepository snackRepository;
    private final TypeRepository typeRepository;

    @Transactional
    public void registerSnacks(List<RegisterRequestDto> requestDto){
        for (RegisterRequestDto dto : requestDto) {
            Type type = typeRepository.findById(dto.getType_id()).orElseThrow(TypeNotFoundException::new);
            Snack snack = dto.toEntity(type);
            snackRepository.save(snack);
        }
    }

    public SnackDetailResponseDto searchSnackDetail(Long snackId){
        Snack snack = snackRepository.findById(snackId).orElseThrow(SnackNotFoundException::new);
        return SnackDetailResponseDto.create(snack);
    }
}
