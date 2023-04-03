import { GradeType, SbtiType } from '@/types/member';

export const getGradeImage = (grade: string) => {
  switch (grade) {
    case 'NONE':
      return '';
    case 'FIRST_FLOOR':
      return '@/assets/member/grade/FIRST_FLOOR.png';
    case 'SECOND_FLOOR':
      return '@/assets/member/grade/SECOND_FLOOR.png';
    case 'THIRD_FLOOR':
      return '@/assets/member/grade/THIRD_FLOOR.png';
    case 'TF_SWEET':
      return '@/assets/member/grade/TF_SWEET.png';
    case 'TF_SALT':
      return '@/assets/member/grade/TF_SALT.png';
    case 'TF_MILD':
      return '@/assets/member/grade/TF_MILD.png';
    case 'TF_SPICY':
      return '@/assets/member/grade/TF_SPICY.png';
    case 'TF_SOUR':
      return '@/assets/member/grade/TF_SOUR.png';
  }
};

export const getSbtiImage = (sbti: string) => {
  switch (sbti) {
    case 'NONE':
      return '';
    case 'INTJ':
      return '@/assets/member/sbti/INTJ.png';
    case 'INTP':
      return '@/assets/member/sbti/INTP.png';
    case 'ENTJ':
      return '@/assets/member/sbti/ENTJ.png';
    case 'ENTP':
      return '@/assets/member/sbti/ENTP.png';
    case 'INFJ':
      return '@/assets/member/sbti/INFJ.png';
    case 'INFP':
      return '@/assets/member/sbti/INFP.png';
    case 'ENFJ':
      return '@/assets/member/sbti/ENFJ.png';
    case 'ENFP':
      return '@/assets/member/sbti/ENFP.png';
    case 'ISTJ':
      return '@/assets/member/sbti/ISTJ.png';
    case 'ISFJ':
      return '@/assets/member/sbti/ISFJ.png';
    case 'ESTJ':
      return '@/assets/member/sbti/ESTJ.png';
    case 'ESFJ':
      return '@/assets/member/sbti/ESFJ.png';
    case 'ISTP':
      return '@/assets/member/sbti/ISTP.png';
    case 'ISFP':
      return '@/assets/member/sbti/ISFP.png';
    case 'ESTP':
      return '@/assets/member/sbti/ESTP.png';
    case 'ESFP':
      return '@/assets/member/sbti/ESFP.png';
  }
};
