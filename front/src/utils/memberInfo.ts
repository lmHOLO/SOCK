import { GradeType, SbtiType } from '@/types/member';

export const getGradeImage = (grade: GradeType) => {
  switch (grade) {
    case 'NONE':
      return '';
    case 'FIRST_FLOOR':
      return '';
    case 'SECOND_FLOOR':
      return '';
    case 'THIRD_FLOOR':
      return '';
    case 'TF_SWEET':
      return '';
    case 'TF_SALT':
      return '';
    case 'TF_MILD':
      return '';
    case 'TF_SPICY':
      return '';
    case 'TF_SOUR':
      return '@/assets/sbti/';
  }
};

export const getSbtiImage = (sbti: SbtiType) => {
  switch (sbti) {
    case 'NONE':
      return '';
    case 'INTJ':
      return '';
    case 'INTP':
      return '';
    case 'ENTJ':
      return '';
    case 'ENTP':
      return '';
    case 'INFJ':
      return '';
    case 'INFP':
      return '';
    case 'ENFJ':
      return '';
    case 'ENFP':
      return '';
    case 'ISTJ':
      return '';
    case 'ISFJ':
      return '';
    case 'ESTJ':
      return '';
    case 'ESFJ':
      return '';
    case 'ISTP':
      return '';
    case 'ISFP':
      return '';
    case 'ESTP':
      return '';
    case 'ESFP':
      return '';
  }
};
