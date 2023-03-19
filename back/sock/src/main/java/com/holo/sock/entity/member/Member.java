package com.holo.sock.entity.member;

import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.member.badge.Grade;
import com.holo.sock.entity.member.badge.SBTI;
import com.holo.sock.entity.member.profile.Profile;
import com.holo.sock.entity.recipe.LikeRecipe;
import com.holo.sock.entity.snack.LikeSnack;
import com.holo.sock.common.config.security.oauth2.userinfo.AuthProvider;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false,unique = true)
    private String email;

    @Column(nullable = false,unique = true)
    private String nickname;

    @Embedded
    private Profile profile;

    private boolean checkPreference;

    @Enumerated(EnumType.STRING)
    private SBTI sbti;

    @Enumerated(EnumType.STRING)
    private Grade grade;

    private int exp;

    @OneToMany(mappedBy = "member")
    private List<LikeSnack> likeSnacks = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<LikeRecipe> likeRecipes = new ArrayList<>();

    @Column @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @Column @Enumerated(EnumType.STRING)
    private Role role; // USER, ADMIN

    public void modifyNickname(String nickname) {
        this.nickname = nickname;
    }
}
