package com.holo.sock.service.member;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.member.badge.Grade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.TreeMap;

@Slf4j
@Service
@Transactional(readOnly = true)
public class GradeService {

    public final int REGISTER_RECIPE = 10;
    public final int GET_LIKE_TO_RECIPE = 5;
    public final int REGISTER_REVIEW = 10;
    public final int PARTICIPATE_CHALLENGE = 3;

    private TreeMap<Integer, Grade> gradeMap = new TreeMap<>(
            Map.ofEntries(
                    Map.entry(0,Grade.FIRST_FLOOR),
                    Map.entry(10,Grade.SECOND_FLOOR),
                    Map.entry(100,Grade.THIRD_FLOOR)
            )
    );

    @Transactional
    public void addExp(Member member, int reason){
        member.addExp(reason);
        member.upgradeGrade(gradeMap.floorEntry(member.getExp()).getValue());
    }

}
