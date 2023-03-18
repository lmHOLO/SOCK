package com.holo.sock.repository.recommend;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recommend.Search;
import com.holo.sock.entity.snack.Snack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SearchRepository extends JpaRepository<Search, Long> {

    Optional<Search> findByMemberAndSnack(Member member, Snack snack);
}
