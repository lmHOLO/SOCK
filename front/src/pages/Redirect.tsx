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
  // const dispatch = useDispatch();
  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      console.log(token);
      /* localStorage.setItem('token', token);
      // api로 가져오기
      loginApi().then(getMemberLoginInfo).then(login); */
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
      <img src={require(`@/assets/home/loading.gif`)} alt='loading-animation' className='main-loading-animation' />

      <img src={require(`@/assets/home/cookie.gif`)} alt='loading-animation' className='sub-loading-animation' />
      <p className='loading-text'>
        간식찾는중<span className='loading-dots'></span>
      </p>
    </div>
  );
}
