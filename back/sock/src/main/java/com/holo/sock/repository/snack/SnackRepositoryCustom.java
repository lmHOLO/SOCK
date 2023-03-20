package com.holo.sock.repository.snack;

import com.holo.sock.dto.snack.request.SearchSnackListRequestDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SnackRepositoryCustom {

    Page<SnackQueryDto> findSnacks(SearchSnackListRequestDto requestDto, Pageable pageable);
}
