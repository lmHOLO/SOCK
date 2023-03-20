package com.holo.sock.service.member;

import com.holo.sock.dto.member.request.MemberPreferenceRequestDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recommend.FlavorPreference;
import com.holo.sock.entity.recommend.TypePreference;
import com.holo.sock.exception.snack.SnackNotFoundException;
import com.holo.sock.repository.member.FlavorPreferenceRepository;
import com.holo.sock.repository.member.TypePreferenceRepository;
import com.holo.sock.repository.snack.SnackRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PreferenceService {
    private final FlavorPreferenceRepository flavorPreferenceRepository;
    private final TypePreferenceRepository typePreferenceRepository;
    private final SnackRepository snackRepository;

    public void registerPreferences(Member member, List<MemberPreferenceRequestDto> preferenceList) {
        registerTypePreferences(member, preferenceList);
        registerFlavorPreferences(member, preferenceList);
    }

    private void registerFlavorPreferences(Member member, List<MemberPreferenceRequestDto> preferenceList) {
        preferenceList.stream()
                .flatMap(dto -> snackRepository.findById(dto.getSnackId())
                        .orElseThrow(SnackNotFoundException::new).getFlavors().stream()
                        .map(flavor -> FlavorPreference.builder()
                                .flavor(flavor.getFlavor())
                                .member(member)
                                .likes(dto.getLikes())
                                .build()))
                .forEach(flavorPreferenceRepository::save);
    }

    private void registerTypePreferences(Member member, List<MemberPreferenceRequestDto> preferenceList) {
        preferenceList.stream()
                .map(dto -> TypePreference.builder()
                        .type(snackRepository.findById(dto.getSnackId())
                                .orElseThrow(SnackNotFoundException::new).getType())
                        .member(member)
                        .likes(dto.getLikes())
                        .build())
                .forEach(typePreferenceRepository::save);
    }
}
