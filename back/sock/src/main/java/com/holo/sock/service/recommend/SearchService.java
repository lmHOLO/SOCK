package com.holo.sock.service.recommend;

import com.holo.sock.dto.search.SearchRedisDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recommend.Search;
import com.holo.sock.entity.redis.SearchRedis;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.repository.jdbc.JdbcRepository;
import com.holo.sock.repository.recommend.SearchRepository;
import com.holo.sock.repository.redis.SearchRedisRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SearchService {

    private final SearchRedisRepository searchRedisRepository;
    private final SearchRepository searchRepository;
    private final JdbcRepository jdbcRepository;

    @Transactional
    public void addCountByMember(Member member, Snack snack){
        Long memberId = member.getId();
        Long snackId = snack.getId();

        Optional<SearchRedis> optionalSearch = searchRedisRepository.findByMemberIdAndSnackId(memberId, snackId);

        SearchRedis search;
        if(optionalSearch.isPresent()){
            search = optionalSearch.get();
            searchRedisRepository.delete(search);
            search.addCount();
        } else {
            search = SearchRedis.builder()
                    .memberId(memberId)
                    .snackId(snackId)
                    .count(1)
                    .build();
        }
        searchRedisRepository.save(search);
    }

    @Scheduled(fixedDelay = 300000)
    @Transactional
    public void reflectRedisToDB(){
        List<SearchRedis> searchRedisList = searchRedisRepository.findAll();
        searchRedisRepository.deleteAll();

        List<SearchRedisDto> updateList = new ArrayList<>();
        List<SearchRedisDto> insertList = new ArrayList<>();

        for (SearchRedis searchRedis : searchRedisList) {
            Optional<Search> optionalSearch =
                    searchRepository.findFromRedis(searchRedis.getMemberId(), searchRedis.getSnackId());

            if(optionalSearch.isPresent()){
                updateList.add(
                        SearchRedisDto.builder()
                                .id(optionalSearch.get().getId())
                                .count(optionalSearch.get().getCount() + searchRedis.getCount())
                                .build()
                );
            }
            else {
                insertList.add(
                        SearchRedisDto.builder()
                                .memberId(searchRedis.getMemberId())
                                .snackId(searchRedis.getSnackId())
                                .count(searchRedis.getCount())
                                .build()
                );
            }
        }

        jdbcRepository.updateSearchFromRedis(updateList);
        jdbcRepository.insertSearchFromRedis(insertList);
    }

}
