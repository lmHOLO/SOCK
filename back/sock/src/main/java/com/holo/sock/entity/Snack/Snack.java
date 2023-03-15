package com.holo.sock.entity.Snack;

import com.holo.sock.entity.BaseEntity;
import com.holo.sock.entity.common.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Builder
public class Snack extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "snack_id")
    private long Id;

    private String image;
    private String name;
    @OneToMany
    @JoinColumn(name = "snackFlavor_id")
    private List<SnackFlavor> snackFlavers = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "type_id")
    private Type type;
    private int sumOfStars;
    private int numberOfParticipants;
    private String engName;
    private boolean domestic;
}
