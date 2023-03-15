import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { loginAction, logoutAction } from '@/store/modules/member';

export default function useMember() {
  const { isLoggedIn } = useSelector((state: RootState) => state.member);
  const dispatch = useDispatch();

  const login = useCallback((data: any) => {
    dispatch(loginAction(data));
  }, []);
  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, []);
  return { isLoggedIn, login, logout };
}
