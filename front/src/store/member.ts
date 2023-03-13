/* 액션 타입 */
const SET_MEMBER = 'member/SET_MEMBER' as const;

/* 액션 생성함수 */
export const setMember = (nickname: string) => ({ type: SET_MEMBER, nickname });

// 모든 액션 객체들에 대한 타입 준비
type MemberAction = ReturnType<typeof setMember>;

export type MemberState = Member;

// 상태에서 사용할 멤버 데이터 타입 정의
export type Member = {
  nickname: string;
};

// 초기 상태 선언
const initialState: Member = {
  nickname: '',
};

/* 리듀서 선언 */
export default function member(state: MemberState = initialState, action: MemberAction): MemberState {
  switch (action.type) {
    case SET_MEMBER:
      return {
        ...state,
        nickname: action.nickname,
      };
    default:
      return state;
  }
}
