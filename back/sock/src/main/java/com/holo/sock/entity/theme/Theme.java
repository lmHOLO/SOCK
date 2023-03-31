package com.holo.sock.entity.theme;

import com.holo.sock.entity.snack.Snack;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Theme {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "theme_id")
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snack_id")
    private Snack snack;
}
