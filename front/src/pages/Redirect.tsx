import { useEffect } from 'react';
// import { setMember } from '@/store/member';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useMember from '@/hooks/memberHook';
import { getMemberLoginInfo } from '@/apis/services/member';
import { loginApi } from '@/apis/api/member';
import { apiInstance } from '@/apis/axiosConfig';
import { isAxiosError } from 'axios';
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
      // api로 가져오기
      // loginApi를 통해 get 요청을 보내 내 로그인 정보를 확인할 수 있음.
      loginApi().then((response) => {
        console.log(response, 'redirect 응답')
        console.log('로그인 get 요청 성공')
        if (!response.checkPreference) {
          navigate('/firstprefer')          
        }
        // console.log(response.checkPreference)
      })
        
        // getMemberLoginInfo).then(login);
      // navigate('/');
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
