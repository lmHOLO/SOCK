package com.holo.sock.service.snack;

import com.holo.sock.dto.snack.request.RegisterReviewRequestDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.snack.Review;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.exception.review.ReviewNotFoundException;
import com.holo.sock.exception.snack.SnackNotFoundException;
import com.holo.sock.repository.snack.ReviewRepository;
import com.holo.sock.repository.snack.SnackRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final SnackRepository snackRepository;
    private final ReviewRepository reviewRepository;

    @Transactional
    public void registerReview(Long snackId, RegisterReviewRequestDto requestDto, Member writer){
        Snack snack = snackRepository.findById(snackId).orElseThrow(SnackNotFoundException::new);

        Review review = requestDto.toEntity(writer, snack);
        reviewRepository.save(review);

        snack.registerReview(requestDto.getStar());
    }

    @Transactional
    public void deleteReview(Member writer, Long snackId){
        Snack snack = snackRepository.findById(snackId).orElseThrow(SnackNotFoundException::new);
        Review review = reviewRepository.findByWriterAndSnack(writer, snack).orElseThrow(ReviewNotFoundException::new);

        snack.deleteReview(review.getStar());
        reviewRepository.delete(review);
    }
}
