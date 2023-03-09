import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { setMember } from 'store/member';
import { useSearchParams, useNavigate } from 'react-router-dom';
export default function Redirect() {
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const member = useSelector((state: RootState) => state.member);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      console.log(token);
      localStorage.setItem('token', token);
      navigate('/');
      return;
    }
    if (error) {
      console.log(error);
      navigate('/login');
      return;
    }
    dispatch(setMember('임시닉네임'));
    console.log(member);
    navigate('/');
    return;
  });

  return (
    <>
      <p>리다이렉트 페이지</p>
    </>
  );
}
