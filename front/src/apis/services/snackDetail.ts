import { SnackDetailType, ReviewListType } from '@/types/snack';

export const getSnackDetail = (snackDetail: SnackDetailType) => {
  return snackDetail;
};

// 리뷰 관련 데이터 정제
export const getMyReview = (rawReview: ReviewListType) => {
  return rawReview.myReview;
};

export const getOtherReviewList = (rawReview: ReviewListType) => {
  return rawReview.otherReviews.content;
};

export const getFirst = (rawReview: ReviewListType) => {
  // console.log('first:', rawReview.otherReviews.first);
  return rawReview.otherReviews.first;
};

export const getLast = (rawReview: ReviewListType) => {
  // console.log('last:', rawReview.otherReviews.first);
};
