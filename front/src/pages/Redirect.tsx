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
      new Promise<void>((resolve) => {
        localStorage.setItem('token', token);
        resolve();
      }).then(() =>
        // api로 가져오기
        // loginApi를 통해 get 요청을 보내 내 로그인 정보를 확인할 수 있음.
        loginApi()
          .then(getMemberLoginInfo)

          .then((data) => {
            login(data);
            if (!data.checkPreference) {
              navigate('/firstprefer');
            } else {
              navigate('/');
            }
          }),
      );

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
