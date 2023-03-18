package com.holo.sock.service.recommend;

import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recommend.Search;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.repository.recommend.SearchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchService {

    private final SearchRepository searchRepository;

    @Transactional
    public void addCountByMember(Member member, Snack snack){
        Optional<Search> optionalSearch = searchRepository.findByMemberAndSnack(member, snack);
        if(optionalSearch.isPresent()){
            Search search = optionalSearch.get();
            search.addCount();
        } else {
            Search search = Search.builder()
                    .member(member)
                    .snack(snack)
                    .count(1)
                    .build();

            searchRepository.save(search);
        }
    }


}
