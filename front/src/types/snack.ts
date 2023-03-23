export type SnackDetailType = {
  snackId: string;
  image: string;
  name: string;
  sumOfStars: string;
  numberOfParticipants: string;
  type: SnackTypeType;
  flavors: FlavorType[];
  like: boolean;
  totalLikes: string;
};

export type SnackTypeType = {
  id: string;
  name: string;
};

export type FlavorType = {
  id: string;
  name: string;
};

// 리뷰 관련
export type ReviewListType = {
  myReview: ReviewType;
  otherReviews: OtherReviewsType;
};

export type OtherReviewsType = {
  content: ReviewType[];
  pageable: PageableType;
  last: boolean;
  totalPages: string;
  totalElements: string;
  size: string;
  number: string;
  sort: SortType;
  first: boolean;
  numberOfElemets: string;
  empty: boolean;
};

export type ReviewType = {
  reviewId: string;
  content: string;
  star: string;
  writer: WriterType;
  createdDate: string;
};

export type WriterType = {
  writerId: string;
  nickname: string;
  image: string;
  sbti: string;
  grade: string;
};

export type PageableType = {
  sort: SortType;
  pageNumber: string;
  pageSize: string;
  offset: string;
  paged: boolean;
  unpaged: boolean;
};

export type SortType = {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
};
