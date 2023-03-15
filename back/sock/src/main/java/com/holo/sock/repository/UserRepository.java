package com.holo.sock.repository;

import com.holo.sock.entity.User;
import com.holo.sock.security.oauth2.user.AuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndProvider(String email, AuthProvider authProvider);
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    boolean existsByEmailAndProvider(String email,AuthProvider authProvider);
}
