import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/modules';
import {
  contentWriteAction,
  addPhotoAction,
  modifyPhotoAction,
  deletePhotoAction,
  addTagAction,
  deleteTagAction,
} from '@/store/modules/recipePosting';

import { ModifyPhotoType } from '@/types';
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
  const modifyPhoto = useCallback(
    (data: ModifyPhotoType) => {
      dispatch(modifyPhotoAction(data));
    },
    [dispatch],
  );

  return { imageList, content, tagList, contentWrite, addPhoto, modifyPhoto };
}
