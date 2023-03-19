package com.holo.sock.dto.member.response;

import com.holo.sock.entity.member.profile.Profile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberSearchResponseDto {
    private String nickname;
    private Profile profile;
}
