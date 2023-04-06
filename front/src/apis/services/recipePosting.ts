import { SnackDetailType } from '@/types/snack';

export const getSnackForTag = (rawSnackList: SnackDetailType[]) => {
  return rawSnackList.map(({ snackId, image, name }) => {
    return {
      id: snackId,
      image: image,
      name: name,
    };
  });
};
