export type SnackTagType = {
  id: string;
  image: string;
  name: string;
};
export type AdType = {
  id: number;
  image: string;
  link: string;
  title: string;
};

export type RecipeListItemType = {
  id: number;
  image: string;
  title: string;
};

export type SnackListItemType = {
  id: number;
  image: string;
  title: string;
};

export type ThemeType = {
  id: number;
  image: string;
  title: string;
};

export type SnackType = {
  id: string;
  name: string;
};

export type FlavorType = {
  id: string;
  name: string;
};

export type SnackDetailType = {
  id: string;
  image: string;
  name: string;
  sumOfStar: string;
  numberOfParticipants: string;
  type: SnackType;
  flavors: FlavorType[];
};

export type RecipeDetailType = {
  id: string;
  image: string;
  title: string;
  tags: SnackTagType[];
  content: string;
};

export type RecipeImageType = {
  image: string;
};

// 댓글
export type CommentType = {
  id: string;
  image: string;
  nickname: string;
  content: string;
  sumOfStar: string;
  creatingDate: string;
};
