import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostingStateType, SnackTagType } from '@/types';
import { ModifyPhotoType } from '@/types';
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
    addPhotoAction(state: PostingStateType, action: PayloadAction<string[]>) {
      let tempImageList = [...state.imageList];
      for (let i = 0; i < action.payload.length; i++) {
        tempImageList.push(action.payload[i]);
      }
      state.imageList = tempImageList;
    },
    modifyPhotoAction(state: PostingStateType, action: PayloadAction<ModifyPhotoType>) {
      state.imageList[action.payload.index] = action.payload.image;
    },

    deletePhotoAction(state: PostingStateType, action: PayloadAction<number>) {
      state.imageList.splice(action.payload, 1);
    },
    addTagAction(state: PostingStateType, action: PayloadAction<SnackTagType>) {
      state.tagList.push(action.payload);
    },
    deleteTagAction(state: PostingStateType, action: PayloadAction<number>) {
      state.tagList.splice(action.payload, 1);
    },
  },
});

const { reducer, actions } = postingSlice;
export const {
  contentWriteAction,
  addPhotoAction,
  modifyPhotoAction,
  deletePhotoAction,
  addTagAction,
  deleteTagAction,
} = actions;
export default reducer;
