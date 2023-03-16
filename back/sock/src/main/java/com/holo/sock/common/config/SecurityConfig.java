package com.holo.sock.common.config;

import com.holo.sock.common.config.security.oauth2.CustomOAuth2UserService;
import com.holo.sock.common.config.security.jwt.TokenAuthenticationFilter;
import com.holo.sock.common.config.security.oauth2.cookie.HttpCookieOAuth2AuthorizationRequestRepository;
import com.holo.sock.common.config.security.oauth2.handler.OAuth2AuthenticationFailureHandler;
import com.holo.sock.common.config.security.oauth2.handler.OAuth2AuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService
            ,HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository
            ,OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler
            ,OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler)
    {
        this.customOAuth2UserService = customOAuth2UserService;
        this.httpCookieOAuth2AuthorizationRequestRepository = httpCookieOAuth2AuthorizationRequestRepository;
        this.oAuth2AuthenticationFailureHandler = oAuth2AuthenticationFailureHandler;
        this.oAuth2AuthenticationSuccessHandler = oAuth2AuthenticationSuccessHandler;
    }
    private CustomOAuth2UserService customOAuth2UserService;
    private HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring()
                .antMatchers("/favicon.ico");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()

                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)  // 세션 사용 x

                .and()
                .authorizeRequests()
                .anyRequest().permitAll()

                .and()
                    .oauth2Login()
                        .authorizationEndpoint().baseUri("/oauth2/authorize")
                        .authorizationRequestRepository(httpCookieOAuth2AuthorizationRequestRepository)
                    .and()
                        .redirectionEndpoint()
                        .baseUri("/oauth2/callback/*")
                    .and()
                        .userInfoEndpoint()
                        .userService(customOAuth2UserService)
                    .and()
                        .successHandler(oAuth2AuthenticationSuccessHandler)
                        .failureHandler(oAuth2AuthenticationFailureHandler);
        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
