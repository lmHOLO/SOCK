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

// 초기 상태 타입
export type MemberStateType = {
  isLoggedIn: boolean;
  memberData: MemberLoginType;
};

export type MemberProfileType = {
  id: string;
  email: string;
  nickname: string;
  profile: ProfileType;
  sbti: string;
  grade: string;
  exp: number;
};

export type MemberPreferType = {
  id: number,
  favor_list: number[],
}

// 프로필
export type MenuType = 'POST_RECIPE' | 'LIKE_SNACK' | 'LIKE_RECIPE';
