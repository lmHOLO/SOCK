package com.holo.sock.security;


import com.holo.sock.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
@Getter @Setter
public class UserDetail implements OAuth2User {
    private Long id;
    private String email;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public UserDetail(long id, String email, List<GrantedAuthority> authorities) {
    }

    public static UserDetail create(User user, Map<String, Object> attributes) {
        UserDetail userDetail = UserDetail.create(user);
        userDetail.setAttributes(attributes);
        return userDetail;
    }

    public static UserDetail create(User user) {
        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority("ROLE_USER"));
        return new UserDetail(
                user.getId(),
                user.getEmail(),
                authorities
        );
    }


    @Override
    public <A> A getAttribute(String name) {
        return OAuth2User.super.getAttribute(name);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return email;
    }
}
