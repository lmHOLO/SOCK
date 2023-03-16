package com.holo.sock.common.config.security.oauth2.userinfo;


import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo{
    Map<String, Object> naverAccount;
    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
        naverAccount = (Map<String, Object>) attributes.get("response");
    }

    @Override
    public String getId() {
        return (String) naverAccount.get("id");
    }

    @Override
    public String getName() {
        return (String) naverAccount.get("nickname");
    }

    @Override
    public String getEmail() {
        return (String) naverAccount.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) naverAccount.get("profile_image");
    }
}
