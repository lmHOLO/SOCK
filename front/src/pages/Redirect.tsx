import React, { useEffect } from 'react';
// import { setMember } from '@/store/member';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useMember from '@/hooks/memberHook';
import { getMemberLoginInfo } from '@/apis/services/member';
import { loginApi } from '@/apis/api/member';
import '@/styles/redirect.css';
export default function Redirect() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { login } = useMember();
  const navigate = useNavigate();
  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      console.log(token);
      new Promise<void>((resolve) => {
      localStorage.setItem('token', token);
      resolve();
    }).then(() =>
      // api로 가져오기
      // loginApi를 통해 get 요청을 보내 내 로그인 정보를 확인할 수 있음.
      loginApi()



      .then(getMemberLoginInfo)
      // .then((data) => {
      //       login(data)
      //       navigate('/');
          



      .then((data) => {
        login(data)
        if (!data.checkPreference){
          console.log('아이디 pk 확인', data.id)
          navigate('/firstprefer')
        }
        else {
          navigate('/');
        }


      }),
      );
      
      
      
      // .then((response) => {
      //   console.log(response, 'redirect 응답')
      //   console.log('로그인 get 요청 성공')
        
      //   if (!response.checkPreference) {
      //     navigate('/firstprefer')          
      //   }
      //   // console.log(response.checkPreference)
      // })
        
      
      
      
      // getMemberLoginInfo).then(login);
      // navigate('/');
      // loginApi().then(getMemberLoginInfo).then(login);
      
      
      
      // upstream 부분
      // new Promise<void>((resolve) => {
      //   localStorage.setItem('token', token);
      //   resolve();
      // }).then(() =>
      //   loginApi()
      //     .then(getMemberLoginInfo)
      //     .then((data) => {
      //       login(data);
      //       navigate('/');
      //     }),
      // );


        
      return;
    }
    if (error) {
      console.log(error);
      navigate('/login');
      return;
    }
  });

  return (
    <div className='redirect-container'>
      <img
        src={require(`@/assets/home/loading_main.gif`)}
        alt=',main-loading-animation'
        className='main-loading-animation'
      />

      <img
        src={require(`@/assets/home/loading_sub.gif`)}
        alt='sub-loading-animation'
        className='sub-loading-animation'
      />

      <h1 className='loading-text'>로딩중</h1>
    </div>
  );
}
