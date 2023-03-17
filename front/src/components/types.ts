export type AdType = {
  id: number;
  image: string;
  link: string;
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
