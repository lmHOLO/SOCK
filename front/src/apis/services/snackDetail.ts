import { SnackDetailType, ReviewListType } from '@/types/snack';
export const getSnackDetail = (snackDetail: SnackDetailType) => {
  return snackDetail;
};

export const getMyReview = (rawReview: ReviewListType) => {
  console.log(rawReview.myReview);
  return rawReview.myReview;
};

export const getOtherReviewList = (rawReview: ReviewListType) => {
  console.log(rawReview.otherReviews.content);
  return rawReview.otherReviews.content;
};

export const getFirst = (rawReview: ReviewListType) => {
  console.log('first:', rawReview.otherReviews.first);
  return rawReview.otherReviews.first;
};

export const getLast = (rawReview: ReviewListType) => {
  console.log('last:', rawReview.otherReviews.first);
};
