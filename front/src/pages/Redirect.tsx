import { useEffect } from 'react';
// import { setMember } from '@/store/member';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useMember from '@/hooks/memberHook';
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
      localStorage.setItem('token', token);
      login('토큰로그인닉네임');
      navigate('/');
      return;
    }
    if (error) {
      console.log(error);
      login('에러로그인닉네임');
      navigate('/login');
      return;
    }
    // dispatch(setMember('SOCK'));
    login('임시테스트닉네임');
    localStorage.setItem('token', 'tokentest');
    navigate('/');
    return;
  });

  return (
    <>
      <p>리다이렉트 페이지</p>
    </>
  );
}
