export type MemberLoginType = {
  id: string;
  email: string;
  nickname: string;
  profile: ProfileType;
  sbti: string;
  grade: string;
  exp: number;
  checkPreference: boolean;
};

// 프로필 (이미지, 소개말)
export type ProfileType = {
  image: string;
  content: string;
};

// Member 리듀서 관련

// 초기 상태 타입
export type MemberStateType = {
  isLoggedIn: boolean;
  memberData: MemberLoginType;
};
