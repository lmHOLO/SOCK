package com.holo.sock.common.config.login;

import com.holo.sock.common.config.security.jwt.TokenProvider;
import com.holo.sock.entity.member.Member;
import com.holo.sock.exception.member.MemberNotFoundException;
import com.holo.sock.repository.member.MemberRepository;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;

    public Member getLoginMember(HttpServletRequest request){
        String token = getTokenFromRequest(request);
        if(token == null) throw new JwtException("토큰이 없습니다.");

        Long memberId = tokenProvider.getUserIdFromToken(token);
        return memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
