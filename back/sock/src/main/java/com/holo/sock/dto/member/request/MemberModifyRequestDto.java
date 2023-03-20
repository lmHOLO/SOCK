package com.holo.sock.dto.member.request;

import com.holo.sock.entity.member.profile.Profile;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberModifyRequestDto {
    private String nickname;
    private Profile profile;
}
