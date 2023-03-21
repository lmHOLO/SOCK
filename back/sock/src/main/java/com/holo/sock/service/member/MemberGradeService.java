package com.holo.sock.service.member;

import com.holo.sock.entity.member.badge.Grade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.TreeMap;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberGradeService {
    private TreeMap<Integer, Grade> gradeMap = new TreeMap<>(
            Map.ofEntries(
                    Map.entry(0,Grade.FIRST_FLOOR),
                    Map.entry(0,Grade.SECOND_FLOOR),
                    Map.entry(0,Grade.THIRD_FLOOR)
            )
    );

}
