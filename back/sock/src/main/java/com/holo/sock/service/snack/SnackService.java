package com.holo.sock.service.snack;

import com.holo.sock.dto.snack.request.RegisterSnackRequestDto;
import com.holo.sock.dto.snack.request.SearchSnackListRequestDto;
import com.holo.sock.dto.snack.response.SnackDetailResponseDto;
import com.holo.sock.dto.snack.response.SnackResponseDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.snack.*;
import com.holo.sock.exception.likesnack.LikeSnackExistedException;
import com.holo.sock.exception.likesnack.LikeSnackNotFoundException;
import com.holo.sock.exception.member.MemberNotFoundException;
import com.holo.sock.exception.snack.SnackNotFoundException;
import com.holo.sock.exception.type.TypeNotFoundException;
import com.holo.sock.repository.member.MemberRepository;
import com.holo.sock.repository.snack.*;
import com.holo.sock.service.qscore.SnackQScoreService;
import com.holo.sock.service.recommend.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SnackService {

    private final MemberRepository memberRepository;
    private final SnackRepository snackRepository;
    private final TypeRepository typeRepository;
    private final FlavorRepository flavorRepository;
    private final LikeSnackRepository likeSnackRepository;

    private final SearchService searchService;
    private final SnackQScoreService snackQScoreService;

    @Transactional
    public void registerSnacks(List<RegisterSnackRequestDto> requestDto){
        HashSet<Long> flavorIdsSet = new HashSet<>();
        for (RegisterSnackRequestDto dto : requestDto) {
            Arrays.stream(dto.getFlavor().split(", ")).map(Long::parseLong).forEach(flavorIdsSet::add);
        }

        List<Flavor> flavorsByIdIn = flavorRepository.findFlavorsByIdIn(new ArrayList<>(flavorIdsSet));
        Map<Long, Flavor> flavorMap = flavorsByIdIn.stream()
                .collect(Collectors.toMap(Flavor::getId, Function.identity()));

        for (RegisterSnackRequestDto dto : requestDto) {
            Type type = typeRepository.findById(dto.getType_id()).orElseThrow(TypeNotFoundException::new);
            List<Long> flavorIds = Arrays.stream(dto.getFlavor().split(", "))
                    .map(Long::parseLong).collect(Collectors.toList());

            Snack snack = dto.toEntity(type);
            for (Long flavorId : flavorIds) {
                snack.getFlavors().add(
                        SnackFlavor.builder()
                                .snack(snack)
                                .flavor(flavorMap.get(flavorId))
                                .build()
                );
            }
            snackRepository.save(snack);
        }
    }

    public Page<SnackResponseDto> snackList(Member member, SearchSnackListRequestDto requestDto, Pageable pageable){
        Page<SnackQueryDto> result = snackRepository.findSnacks(requestDto, pageable);

        List<Long> snackIds = result.getContent().stream().map(SnackQueryDto::getSnackId).collect(Collectors.toList());
        HashSet<Long> snackIdsWithLike = new HashSet<>(likeSnackRepository.findSnackIdsWithLike(snackIds, member));

        return result.map(dto -> SnackResponseDto.create(dto, snackIdsWithLike));
    }

    public List<SnackResponseDto> likeSnackList(Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
        return member.getLikeSnacks()
                .stream()
                .map(likeSnack -> SnackResponseDto.createFromLikeSnack(likeSnack.getSnack()))
                .collect(Collectors.toList());
    }

    @Transactional
    public SnackDetailResponseDto searchSnackDetail(Member member, Long snackId){
        Snack snack = snackRepository.findSnackByIdWithTypeAndFlavor(snackId).orElseThrow(SnackNotFoundException::new);
        boolean like = likeSnackRepository.existsByMemberAndSnack(member, snack);
        Long totalLikes = likeSnackRepository.countBySnack(snack);

        // 회원 당 검색 횟수 증가
        searchService.addCountByMember(member, snack);

        // 과자 인기도 증가
        snackQScoreService.addQScore(snack);

        return SnackDetailResponseDto.create(snack, like, totalLikes);
    }

    @Transactional
    public void likeSnack(Member loginMember, Long snackId){
        Snack snack = snackRepository.findById(snackId).orElseThrow(SnackNotFoundException::new);

        boolean existedLikeSnack = likeSnackRepository.existsByMemberAndSnack(loginMember, snack);
        if(existedLikeSnack) throw new LikeSnackExistedException();

        LikeSnack likeSnack = LikeSnack.builder()
                .member(loginMember)
                .snack(snack)
                .build();
        likeSnackRepository.save(likeSnack);

        snackQScoreService.addQScore(snack);
    }

    @Transactional
    public void deleteLikeSnack(Member loginMember, Long snackId){
        Snack snack = snackRepository.findById(snackId).orElseThrow(SnackNotFoundException::new);

        LikeSnack likeSnack = likeSnackRepository.findByMemberAndSnack(loginMember, snack)
                .orElseThrow(LikeSnackNotFoundException::new);

        likeSnackRepository.delete(likeSnack);
        snackQScoreService.subQScore(snack);
    }
}
