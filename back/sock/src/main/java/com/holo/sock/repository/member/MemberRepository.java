package com.holo.sock.repository.member;

import com.holo.sock.common.config.security.oauth2.userinfo.AuthProvider;
import com.holo.sock.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmailAndProvider(String email, AuthProvider authProvider);

    Long countByNickname(String nickname);

    List<Member> findByNicknameContaining(String nickname);

    Optional<Member> findByEmail(String email);

    Boolean existsByEmail(String email);

    boolean existsByEmailAndProvider(String email,AuthProvider authProvider);
}
