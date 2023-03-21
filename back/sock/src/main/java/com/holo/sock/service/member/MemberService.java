package com.holo.sock.service.member;

import com.holo.sock.dto.member.request.MemberModifyRequestDto;
import com.holo.sock.dto.member.response.MemberDetailResponseDto;
import com.holo.sock.dto.member.response.MemberSearchResponseDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.exception.member.MemberNotFoundException;
import com.holo.sock.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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


    public Page<MemberSearchResponseDto> searchMemberList(Member loginMember, String nickname, Pageable pageable) {
        return memberRepository.findByNicknameContaining(nickname, loginMember.getId(), pageable)
                .map(MemberSearchResponseDto::create);
    }

    @Transactional
    public void modifyMember(MemberModifyRequestDto memberModifyDto, Member member) {
        log.info("beforeModify :{}", memberModifyDto);
        member.modifyMember(memberModifyDto);
        memberRepository.save(member);
    }

    public MemberDetailResponseDto getMemberDetail(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(MemberNotFoundException::new);
        return MemberDetailResponseDto.create(member);
    }
}
