import React from 'react';

export default function LoginBtn() {
  const kakaoLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    console.log(`${process.env.REACT_APP_API_BASE_URL}`);
    window.open(
      `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}`,
    );
  };
  const googleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    window.open(
      `${process.env.REACT_APP_API_BASE_URL}/oauth2/authorize/google?redirect_uri=${process.env.REACT_APP_OAUTH2_REDIRECT_URI}`,
    );
  };
  return (
    <div>
      <button onClick={kakaoLogin}>카카오로 로그인</button>
      <button>네이버로 로그인</button>
      <button onClick={googleLogin}>구글로 로그인</button>
    </div>
  );
}
