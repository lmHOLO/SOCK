package com.holo.sock.entity.Member;

import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.Member.Badge.Badge;
import com.holo.sock.entity.Member.Profile.Profile;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@Table(name = "member")
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private long Id;
    @Column(nullable = false,unique = true)
    private String email;
    @Column(nullable = false,unique = true)
    private String nickname;
    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id")
    private Profile profile;
    private boolean checkPreference;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "badge_id")
    private Badge badge;
    private int exp;
}
