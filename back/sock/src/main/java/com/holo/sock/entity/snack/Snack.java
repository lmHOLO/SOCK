package com.holo.sock.entity.snack;

import com.holo.sock.entity.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Snack extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "snack_id")
    private Long id;

    private String image;

    private String name;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id")
    private Type type;

    private int sumOfStars;

    private int numberOfParticipants;

    @OneToMany(mappedBy = "snack", cascade = CascadeType.ALL)
    private List<SnackFlavor> flavors = new ArrayList<>();

    public void registerReview(int star){
        this.sumOfStars += star;
        this.numberOfParticipants++;
    }

    public void deleteReview(int star){
        this.sumOfStars -= star;
        this.numberOfParticipants--;
    }
}
