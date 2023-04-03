import { GradeType, SbtiType } from '@/types/member';

export const getGradeImage = (grade: GradeType) => {
  switch (grade) {
    case 'NONE':
      return '';
    case 'FIRST_FLOOR':
      return '@/assets/grade/FIRST_FLOOR.png';
    case 'SECOND_FLOOR':
      return '@/assets/grade/SECOND_FLOOR.png';
    case 'THIRD_FLOOR':
      return '@/assets/grade/THIRD_FLOOR.png';
    case 'TF_SWEET':
      return '@/assets/grade/TF_SWEET.png';
    case 'TF_SALT':
      return '@/assets/grade/TF_SALT.png';
    case 'TF_MILD':
      return '@/assets/grade/TF_MILD.png';
    case 'TF_SPICY':
      return '@/assets/grade/TF_SPICY.png';
    case 'TF_SOUR':
      return '@/assets/grade/TF_SOUR.png';
  }
};

export const getSbtiImage = (sbti: SbtiType) => {
  switch (sbti) {
    case 'NONE':
      return '';
    case 'INTJ':
      return '@/assets/sbti/INTJ.png';
    case 'INTP':
      return '@/assets/sbti/INTP.png';
    case 'ENTJ':
      return '@/assets/sbti/ENTJ.png';
    case 'ENTP':
      return '@/assets/sbti/ENTP.png';
    case 'INFJ':
      return '@/assets/sbti/INFJ.png';
    case 'INFP':
      return '@/assets/sbti/INFP.png';
    case 'ENFJ':
      return '@/assets/sbti/ENFJ.png';
    case 'ENFP':
      return '@/assets/sbti/ENFP.png';
    case 'ISTJ':
      return '@/assets/sbti/ISTJ.png';
    case 'ISFJ':
      return '@/assets/sbti/ISFJ.png';
    case 'ESTJ':
      return '@/assets/sbti/ESTJ.png';
    case 'ESFJ':
      return '@/assets/sbti/ESFJ.png';
    case 'ISTP':
      return '@/assets/sbti/ISTP.png';
    case 'ISFP':
      return '@/assets/sbti/ISFP.png';
    case 'ESTP':
      return '@/assets/sbti/ESTP.png';
    case 'ESFP':
      return '@/assets/sbti/ESFP.png';
  }
};
