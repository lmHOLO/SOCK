package com.holo.sock.security;


import com.holo.sock.entity.User;
import com.holo.sock.repository.UserRepository;
import com.holo.sock.security.oauth2.user.AuthProvider;
import com.holo.sock.security.oauth2.user.OAuth2UserInfo;
import com.holo.sock.security.oauth2.user.OAuth2UserInfoFactory;
import com.holo.sock.security.oauth2.user.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    private final UserRepository userRepository;

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
        Optional<User> optionalUser = userRepository.findByEmailAndProvider(userInfo.getEmail(),authProvider);
        User user;

        if (optionalUser.isPresent()) {
            user = updateUser(optionalUser.get(), userInfo);
        } else {
            user = createUser(userInfo, authProvider);
        }

        return UserDetail.create(user, oAuth2User.getAttributes());
    }

    @Transactional
    User createUser(OAuth2UserInfo userInfo, AuthProvider authProvider) {
        User user = User.builder()
                .email(userInfo.getEmail())
                .nickname(userInfo.getName())
                .imageUrl(userInfo.getImageUrl())
                .provider(authProvider)
                .checkPreference(false)
                .role(Role.USER)
                .exp(0)
                .build();
        log.info("email: {}",user.getEmail());
        log.info("nickname: {}",user.getNickname());
        log.info("imageUrl: {}",user.getImageUrl());

        return userRepository.save(user);
    }

    @Transactional
    User updateUser(User existingUser, OAuth2UserInfo userInfo) {
        if (userInfo.getName() != null && !existingUser.getNickname().equals(userInfo.getName())) {
            existingUser.setNickname(userInfo.getName());
        }
        if (userInfo.getImageUrl() != null && !existingUser.getImageUrl().equals(userInfo.getImageUrl())) {
            existingUser.setImageUrl(userInfo.getImageUrl());
        }
        return existingUser;
    }
}