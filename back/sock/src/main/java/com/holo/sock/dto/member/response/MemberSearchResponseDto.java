package com.holo.sock.dto.member.response;

import com.holo.sock.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberSearchResponseDto {
    private Long id;
    private String nickname;
    private String image;

    public static MemberSearchResponseDto create(Member member) {
        return MemberSearchResponseDto.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .image(member.getProfile().getImage())
                .build();
    }

}
