package com.holo.sock.service.member;

import com.holo.sock.repository.member.FlavorPreferenceRepository;
import com.holo.sock.repository.member.TypePreferenceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class PreferenceService {
    private final FlavorPreferenceRepository flavorPreferenceRepository;
    private final TypePreferenceRepository typePreferenceRepository;
}
