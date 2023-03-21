package com.holo.sock.repository.member;

import com.holo.sock.common.config.security.oauth2.userinfo.AuthProvider;
import com.holo.sock.entity.member.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmailAndProvider(String email, AuthProvider authProvider);

    Long countByNickname(String nickname);

    @Query("select m from Member m where m.nickname like concat('%', :nickname, '%') and m.id <> :loginMemberId")
    Page<Member> findByNicknameContaining(String nickname, Long loginMemberId, Pageable pageable);

    Optional<Member> findByEmail(String email);

    Boolean existsByEmail(String email);

    boolean existsByEmailAndProvider(String email,AuthProvider authProvider);
}
