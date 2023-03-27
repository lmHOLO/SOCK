package com.holo.sock.dto.member.response;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.member.badge.Grade;
import com.holo.sock.entity.member.badge.SBTI;
import com.holo.sock.entity.member.profile.Profile;
import com.holo.sock.entity.recipe.LikeRecipe;
import com.holo.sock.entity.snack.LikeSnack;
import lombok.*;

import java.util.List;
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class MemberDetailResponseDto {
    private Long id;
    private String email;
    private String nickname;
    private Profile profile;
    private SBTI sbti;
    private Grade grade;
    private int exp;
    private boolean checkPreference;

    public static MemberDetailResponseDto create(Member member) {
        return MemberDetailResponseDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .profile(member.getProfile())
                .sbti(member.getSbti())
                .grade(member.getGrade())
                .exp(member.getExp())
                .checkPreference(member.isCheckPreference())
                .build();
    }

}
