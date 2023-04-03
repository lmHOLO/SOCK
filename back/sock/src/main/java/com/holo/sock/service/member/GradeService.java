package com.holo.sock.service.member;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.member.badge.Grade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.TreeMap;

import static com.holo.sock.entity.member.badge.Grade.*;

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
                    Map.entry(0, FIRST_FLOOR),
                    Map.entry(10, SECOND_FLOOR),
                    Map.entry(100, THIRD_FLOOR),
                    Map.entry(200, TF)
            )
    );

    @Transactional
    public void addExp(Member member, int reason){
        int preExp = member.getExp();
        member.addExp(reason);
        if(preExp < 200) {
            member.upgradeGrade(gradeMap.floorEntry(member.getExp()).getValue());
            if(member.getGrade() == TF) {
                Grade[] top = new Grade[]{TF_SWEET,TF_SALT,TF_MILD,TF_SPICY,TF_SOUR};
                int idx = (int) (Math.random() * 5);
                member.upgradeGrade(top[idx]);
            }
        }
    }

}
