package com.holo.sock.repository.snack;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.snack.LikeSnack;
import com.holo.sock.entity.snack.Snack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeSnackRepository extends JpaRepository<LikeSnack, Long> {

    boolean existsByMemberAndSnack(Member member, Snack snack);
    Optional<LikeSnack> findByMemberAndSnack(Member member, Snack snack);
    Long countBySnack(Snack snack);

    @Query("select ls.snack.id from LikeSnack ls where ls.snack.id in :snackIds and ls.member = :member")
    List<Long> findSnackIdsWithLike(List<Long> snackIds, Member member);
}
