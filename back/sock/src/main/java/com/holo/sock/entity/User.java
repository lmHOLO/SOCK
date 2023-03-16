package com.holo.sock.entity;

import com.holo.sock.security.oauth2.user.AuthProvider;
import com.holo.sock.security.oauth2.user.Role;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@Getter @Setter
@Builder
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    private String email;
    private String nickname;
    private boolean checkPreference;
    private int exp;


    /////////////////////////////////////////////////////////
    @Column(columnDefinition = "MEDIUMBLOB")
    private String imageUrl;
    @Column @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    @Column @Enumerated(EnumType.STRING)
    private Role role; // USER, ADMIN

}
