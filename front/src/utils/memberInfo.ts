// import { GradeType, SbtiType } from '@/types/member';

export const getGradeImage = (grade: string) => {
  switch (grade) {
    case 'NONE':
      return '';
    case 'FIRST_FLOOR':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/grade%2FFIRST_FLOOR.png?alt=media&token=c3a03770-3b76-44e2-ab11-d2fb481d527d';
    case 'SECOND_FLOOR':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/grade%2FSECOND_FLOOR.png?alt=media&token=b4835848-b72f-475f-9f54-5a69c01f567c';
    case 'THIRD_FLOOR':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/grade%2FTHIRD_FLOOR.png?alt=media&token=4467d247-5aea-4365-a578-20fc9a931772';
    case 'TF_SWEET':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/grade%2FTF_SWEET.png?alt=media&token=a1b6a6f9-12e7-4ad8-be1e-c7d384ba9d8c';
    case 'TF_SALT':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/grade%2FTF_SALT.png?alt=media&token=66d588e1-29a2-4ed9-9fad-5bd93040b5a9';
    case 'TF_MILD':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/grade%2FTF_MILD.png?alt=media&token=3b452098-b178-4309-9b91-08a7a056ef2d';
    case 'TF_SPICY':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/grade%2FTF_SPICY.png?alt=media&token=f9f82a83-e59d-4ca1-90db-b05a29ba76da';
    case 'TF_SOUR':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/grade%2FTF_SOUR.png?alt=media&token=26ab7d7a-e0d5-4aee-9a89-61cfef6ae1c8';
  }
};

/*  */

export const getSbtiImage = (sbti: string) => {
  switch (sbti) {
    case 'NONE':
      return '';
    case 'INTJ':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FINTJ.png?alt=media&token=4b83ed32-c5a8-4eb6-900f-098c26b5656a';
    case 'INTP':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FINTP.png?alt=media&token=4f32a326-657f-47e9-b404-ce5560916b48';
    case 'ENTJ':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FENTJ.png?alt=media&token=bb49dfb8-c090-4f61-a592-81f98190e28f';
    case 'ENTP':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FENTP.png?alt=media&token=d13a10ec-935e-42ac-b96c-1f9332feb9de';
    case 'INFJ':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FINFJ.png?alt=media&token=9b362c05-39bf-47e0-849f-cfd42fb763c3';
    case 'INFP':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FINFP.png?alt=media&token=6780dfd3-a30a-4c05-a804-bd1e229756d3';
    case 'ENFJ':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FENFJ.png?alt=media&token=1f68e9e8-483d-414f-af13-18f5ec4a721c';
    case 'ENFP':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FENFP.png?alt=media&token=9dd09655-0bcb-4666-a253-028ddc8451ac';
    case 'ISTJ':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FISTJ.png?alt=media&token=c570788e-e19e-4a2a-b304-bc5bba011f81';
    case 'ISFJ':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FISFJ.png?alt=media&token=689dedb7-c01f-4418-a6bc-29320f4f7c37';
    case 'ESTJ':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FESTJ.png?alt=media&token=cb766b10-4703-4d8b-9f3f-7b6854ac3490';
    case 'ESFJ':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FESFJ.png?alt=media&token=21678122-5c8a-438f-9ae5-5fb7ec2dbee1';
    case 'ISTP':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FISTP.png?alt=media&token=9e149d4d-5367-4525-9466-20aeb809687e';
    case 'ISFP':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FISFP.png?alt=media&token=54d17b2a-08df-41d9-8cc7-e1caaf59a639';
    case 'ESTP':
      return '@/assets/member/sbti/ESTP.png';
    case 'ESFP':
      return 'https://firebasestorage.googleapis.com/v0/b/sock-f6e94.appspot.com/o/sbti%2FESFP.png?alt=media&token=a9e0d726-4962-4313-92a1-c333605bf4f0';
  }
};
/*
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
}; */
/* export const getSbtiImage = (sbti: string) => {
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
 */
