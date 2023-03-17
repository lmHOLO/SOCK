package com.holo.sock.entity.member.profile;

import lombok.*;

import javax.persistence.*;

@Embeddable
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Profile {

    private String image;

    private String content;
}
