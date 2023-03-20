import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostingStateType, SnackTagType } from '@/types';

// 초기상태
const initialState: PostingStateType = {
  imageList: [],
  content: '',
  tagList: [],
};

const postingSlice = createSlice({
  name: 'recipePosting',
  initialState,
  reducers: {
    contentWriteAction(state: PostingStateType, action: PayloadAction<string>) {
      state.content = action.payload;
    },
    addPhotos(state: PostingStateType, action: PayloadAction<File[]>) {
      let tempImageList = [...state.imageList];
      for (let i = 0; i < action.payload.length; i++) {
        tempImageList.push(action.payload[i]);
      }
      state.imageList = tempImageList;
    },
    deletePhoto(state: PostingStateType, action: PayloadAction<number>) {
      state.imageList.splice(action.payload, 1);
    },
    addTag(state: PostingStateType, action: PayloadAction<SnackTagType>) {
      state.tagList.push(action.payload);
    },
    deleteTag(state: PostingStateType, action: PayloadAction<number>) {
      state.tagList.splice(action.payload, 1);
    },
  },
});

const { reducer, actions } = postingSlice;
export const { contentWriteAction, addPhotos, deletePhoto, addTag, deleteTag } = actions;
export default reducer;
