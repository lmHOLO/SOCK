import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 상태에서 사용할 멤버 데이터 타입 정의
export type Member = {
  nickname: string;
};
// 초기 상태 타입
export type MemberState = {
  isLoggedIn: boolean;
  memberData: Member;
};

// 액션 Payload 타입
export type LoginPayload = {
  nickname: string;
};

// 초기상태
const initialState: MemberState = {
  isLoggedIn: false,
  memberData: {
    nickname: '',
  },
};

// 리듀서 슬라이스
const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    loginAction(state: MemberState, action: PayloadAction<LoginPayload>) {
      state.isLoggedIn = true;
      state.memberData = action.payload;
    },
    logoutAction(state: MemberState) {
      state.isLoggedIn = false;
      state.memberData = {
        nickname: '',
      };
    },
  },
});

// 리듀서 & 액션 리턴
const { reducer, actions } = memberSlice;
export const { loginAction, logoutAction } = actions;
export default reducer;
