import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/modules';
import {
  contentWriteAction,
  addPhotoAction,
  deletePhotoAction,
  addTagAction,
  deleteTagAction,
} from '@/store/modules/recipePosting';

import { SnackTagType } from '@/types';
export default function useRecipePosting() {
  const { imageList, content, tagList } = useSelector((state: RootState) => state.recipePosting);

  const dispatch = useDispatch();

  const contentWrite = useCallback(
    (data: string) => {
      dispatch(contentWriteAction(data));
    },
    [dispatch],
  );
  const addPhoto = useCallback(
    (data: File[]) => {
      dispatch(addPhotoAction(data));
    },
    [dispatch],
  );
  const deletePhoto = useCallback(
    (data: number) => {
      dispatch(deletePhotoAction(data));
    },
    [dispatch],
  );
  const addTag = useCallback(
    (data: SnackTagType) => {
      dispatch(addTagAction({ id: data.id, image: data.image, name: data.name }));
    },
    [dispatch],
  );

  const deleteTag = useCallback(
    (data: number) => {
      dispatch(deleteTagAction(data));
    },
    [dispatch],
  );

  return { imageList, content, tagList, contentWrite, addPhoto, deletePhoto, addTag, deleteTag };
}
