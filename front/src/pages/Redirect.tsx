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
        loginApi()
          .then(getMemberLoginInfo)
          .then((data) => {
            login(data);
            navigate('/');
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
