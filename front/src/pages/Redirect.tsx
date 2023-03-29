import { useEffect } from 'react';
// import { setMember } from '@/store/member';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useMember from '@/hooks/memberHook';
import { getMemberLoginInfo } from '@/apis/services/member';
import { loginApi } from '@/apis/api/member';
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
      }).then(() => loginApi().then(getMemberLoginInfo).then(login));
      navigate('/');
      return;
    }
    if (error) {
      console.log(error);
      navigate('/login');
      return;
    }
  });

  return (
    <>
      <p>리다이렉트 페이지</p>
    </>
  );
}
