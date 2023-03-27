package com.holo.sock.repository.event;

import com.holo.sock.entity.event.SBTIQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SBTIQuestionRepository extends JpaRepository<SBTIQuestion, Long> {

}
