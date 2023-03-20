package com.holo.sock.service.member;

import com.holo.sock.dto.member.request.MemberModifyRequestDto;
import com.holo.sock.dto.member.response.MemberDetailResponseDto;
import com.holo.sock.dto.member.response.MemberSearchResponseDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.exception.member.MemberNotFoundException;
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


    public List<MemberSearchResponseDto> searchMember(Member loginMember, String nickname) {
        List<Member> members = memberRepository.findByNicknameContaining(nickname);
        log.info("members: {}", members);
        return members.stream()
                .filter(member-> loginMember.getId()!=member.getId())
                .map(member -> MemberSearchResponseDto.builder()
                        .id(member.getId())
                        .nickname(member.getNickname())
                        .image(member.getProfile().getImage())
                        .build()
                )
                .collect(Collectors.toList());
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
