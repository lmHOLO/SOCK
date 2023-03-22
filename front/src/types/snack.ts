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
