package com.holo.sock.repository.snack;

import com.holo.sock.dto.snack.request.SearchSnackListRequestDto;
import com.holo.sock.entity.snack.Snack;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SnackRepositoryCustom {

    Page<SnackQueryDto> findSnacks(SearchSnackListRequestDto requestDto, Pageable pageable);

    List<Snack> findSimilarSnacks(List<Long> typeIds, List<Long> flavorIds, Long snackId);
}
