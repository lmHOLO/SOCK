package com.holo.sock.dto.member.response;

import com.holo.sock.entity.member.badge.Grade;
import com.holo.sock.entity.member.badge.SBTI;
import com.holo.sock.entity.member.profile.Profile;
import com.holo.sock.entity.recipe.LikeRecipe;
import com.holo.sock.entity.snack.LikeSnack;

import java.util.List;

public class MemberDetailResponseDto {
    private String email;
    private String nickname;
    private Profile profile;
    private SBTI sbti;
    private Grade grade;
    private int exp;
    private List<LikeSnack> likeSnacks;
    private List<LikeRecipe> likeRecipes;
}
