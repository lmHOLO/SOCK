package com.holo.sock.service.theme;

import com.holo.sock.dto.theme.ThemeDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.theme.Theme;
import com.holo.sock.repository.snack.LikeSnackRepository;
import com.holo.sock.repository.theme.ThemeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ThemeService {

    private final ThemeRepository themeRepository;
    private final LikeSnackRepository likeSnackRepository;

    public Page<ThemeDto> themeSnackList(Member member, String theme, Pageable pageable){
        Page<Theme> themeList = themeRepository.findByTheme(theme, pageable);

        List<Long> snackIds = themeList.stream().map(t -> t.getSnack().getId()).collect(Collectors.toList());
        HashSet<Long> snackIdsWithLike = new HashSet<>(likeSnackRepository.findSnackIdsWithLike(snackIds, member));

        return themeList.map(t -> ThemeDto.create(t, snackIdsWithLike));
    }
}
