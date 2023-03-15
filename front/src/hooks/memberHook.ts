import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/modules';
import { loginAction, logoutAction } from '@/store/modules/member';

export default function useMember() {
  const { isLoggedIn, memberData } = useSelector((state: RootState) => state.member);
  const dispatch = useDispatch();

  const login = useCallback(
    (data: string) => {
      dispatch(loginAction({ nickname: data }));
    },
    [dispatch],
  );
  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);
  return { isLoggedIn, memberData, login, logout };
}
