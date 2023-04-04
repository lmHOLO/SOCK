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

export type SearchMemberType = {
  id: string;
  nickname: string;
  image: string;
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

export type UpdateProfileType = {
  nickname: string;
  profile: ProfileType;
};

// 마이페이지 그리드
export type ProfileGridItemType = {
  id: string;
  image: string;
};

// 등급
export type GradeType =
  | 'NONE'
  | 'FIRST_FLOOR'
  | 'SECOND_FLOOR'
  | 'THIRD_FLOOR'
  | 'TF_SWEET'
  | 'TF_SALT'
  | 'TF_MILD'
  | 'TF_SPICY'
  | 'TF_SOUR';

export type SbtiType =
  | 'NONE'
  | 'INTJ'
  | 'INTP'
  | 'ENTJ'
  | 'ENTP'
  | 'INFJ'
  | 'INFP'
  | 'ENFJ'
  | 'ENFP'
  | 'ISTJ'
  | 'ISFJ'
  | 'ESTJ'
  | 'ESFJ'
  | 'ISTP'
  | 'ISFP'
  | 'ESTP'
  | 'ESFP';
