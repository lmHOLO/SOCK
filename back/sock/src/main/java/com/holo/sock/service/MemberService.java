package com.holo.sock.service;

import com.holo.sock.dto.member.request.MemberModifyRequestDto;
import com.holo.sock.dto.member.response.MemberSearchResponseDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;

    public Boolean isUniqueNickname(String nickname) {
        Long count = memberRepository.countByNickname(nickname);
        if (count == 0) {
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }


    public List<MemberSearchResponseDto> searchMember(String nickname) {
        List<Member> members = memberRepository.findByNicknameContaining(nickname);
        log.info("members: {}",members);
        return members.stream()
                .map(member -> MemberSearchResponseDto.builder()
                            .nickname(member.getNickname())
                            .profile(member.getProfile())
                            .build()
                )
                .collect(Collectors.toList());
    }
    @Transactional
    public void modifyMember(MemberModifyRequestDto memberModifyDto, Member member) {
        log.info("beforeModify :{}",memberModifyDto);
        member.modifyMember(memberModifyDto);
        memberRepository.save(member);
    }
}
