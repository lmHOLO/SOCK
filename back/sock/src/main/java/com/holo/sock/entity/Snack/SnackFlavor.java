package com.holo.sock.entity.Snack;

import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.common.Flavor;
import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class SnackFlavor extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "snackFlavor_id")
    private long Id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "snack_id")
    private Snack snack;
    @OneToOne
    @JoinColumn(name = "flavor_id")
    private Flavor flavor;
}
