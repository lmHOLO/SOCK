package com.holo.sock.common.config.security.oauth2;


import com.holo.sock.common.config.security.jwt.UserDetail;
import com.holo.sock.common.config.security.oauth2.userinfo.AuthProvider;
import com.holo.sock.common.config.security.oauth2.userinfo.OAuth2UserInfo;
import com.holo.sock.common.config.security.oauth2.userinfo.OAuth2UserInfoFactory;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.member.badge.Grade;
import com.holo.sock.entity.member.badge.SBTI;
import com.holo.sock.entity.member.profile.Profile;
import com.holo.sock.repository.member.MemberRepository;
import com.holo.sock.entity.member.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;
    private final static int RANDOM_STRING_SIZE = 10;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        try {
            return this.process(userRequest, user);
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toLowerCase());
        String registrationId = authProvider.toString();

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, oAuth2User.getAttributes());
        Optional<Member> optionalMember = memberRepository.findByEmailAndProvider(userInfo.getEmail(),authProvider);
        Member user;

        if (optionalMember.isPresent()) {
            user = updateUser(optionalMember.get(), userInfo);
        } else {
            user = createUser(userInfo, authProvider);
        }

        return UserDetail.create(user, oAuth2User.getAttributes());
    }

    @Transactional
    Member createUser(OAuth2UserInfo userInfo, AuthProvider authProvider) {
        Profile profile = Profile.builder()
                .image(userInfo.getImageUrl())
                .build();

        Member member = Member.builder()
                .email(userInfo.getEmail())
                .nickname((userInfo.getName()+"_"+RandomStringUtils.randomAlphanumeric(RANDOM_STRING_SIZE)).trim())
                .profile(profile)
                .provider(authProvider)
                .checkPreference(false)
                .role(Role.USER)
                .exp(0)
                .grade(Grade.FIRST_FLOOR)
                .sbti(SBTI.NONE)
                .build();

        return memberRepository.save(member);
    }

    @Transactional
    Member updateUser(Member existingMember, OAuth2UserInfo userInfo) {
        return existingMember;
    }
}