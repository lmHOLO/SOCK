package com.holo.sock.repository.recommend;

import com.holo.sock.entity.recommend.Search;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SearchRepository extends JpaRepository<Search, Long> {

    @Query("select s from Search s where s.member.id = :memberId and s.snack.id = :snackId")
    Optional<Search> findFromRedis(Long memberId, Long snackId);
}
