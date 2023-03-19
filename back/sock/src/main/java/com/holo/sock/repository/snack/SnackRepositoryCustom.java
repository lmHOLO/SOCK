package com.holo.sock.repository.snack;

import com.holo.sock.dto.snack.request.SearchSnackListRequestDto;
import com.holo.sock.entity.snack.Snack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SnackRepositoryCustom {

    Page<Snack> findSnacks(SearchSnackListRequestDto requestDto, Pageable pageable);
}
