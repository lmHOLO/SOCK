package com.holo.sock.service;

import com.holo.sock.entity.member.Member;
import com.holo.sock.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;

    public Boolean isUniqueNickname(String nickname) {
        Long count = memberRepository.countByNickname(nickname);
        if (count == 0) {
            return new Boolean(true);
        }
        return new Boolean(false);
    }



}
