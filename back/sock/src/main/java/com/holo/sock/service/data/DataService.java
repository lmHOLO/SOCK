package com.holo.sock.service.data;

import com.holo.sock.dto.data.PurchaseDumpDto;
import com.holo.sock.dto.data.ReviewDumpDto;
import com.holo.sock.dto.data.SearchDumpDto;
import com.holo.sock.dto.review.request.RegisterReviewRequestDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.exception.member.MemberNotFoundException;
import com.holo.sock.exception.snack.SnackNotFoundException;
import com.holo.sock.repository.jdbc.JdbcDataRepository;
import com.holo.sock.repository.member.MemberRepository;
import com.holo.sock.repository.snack.SnackRepository;
import com.holo.sock.service.snack.ReviewService;
import com.holo.sock.service.snack.SnackService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class DataService {

    private final JdbcDataRepository jdbcDataRepository;
    private final MemberRepository memberRepository;
    private final SnackService snackService;
    private final ReviewService reviewService;

    public void registerPurchase(List<PurchaseDumpDto> request){
//        jdbcDataRepository.savePurchase(request);
        for (PurchaseDumpDto purchaseDumpDto : request) {
            Long memberId = purchaseDumpDto.getMember_id();
            Long snackId = purchaseDumpDto.getSnack_id();
            int count = purchaseDumpDto.getCount();

            Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);

            for(int i = 0; i < count; i++){
                snackService.purchaseSnack(member, snackId);
            }
        }

    }

    public void registerReview(List<ReviewDumpDto> request){
//        jdbcDataRepository.saveReview(request);
        for (ReviewDumpDto reviewDumpDto : request) {
            RegisterReviewRequestDto requestDto = RegisterReviewRequestDto.builder()
                    .content("테스트용 리뷰입니다.")
                    .star(reviewDumpDto.getStar())
                    .build();

            Member writer = memberRepository.findById(reviewDumpDto.getWriter_id())
                    .orElseThrow(MemberNotFoundException::new);

            reviewService.registerReview(reviewDumpDto.getSnack_id(), requestDto, writer);
        }
    }

    public void registerSearch(List<SearchDumpDto> request){
        jdbcDataRepository.saveSearch(request);
    }
}
