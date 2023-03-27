import { SnackDetailType } from '@/types/snack';
import { title } from 'process';

export const getSnackForTag = (rawSnackList: SnackDetailType[]) => {
  return rawSnackList.map(({ snackId, image, name }) => {
    return {
      id: snackId,
      image: image,
      name: name,
    };
  });
};
