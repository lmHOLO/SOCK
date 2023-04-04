import React from 'react';
import '@/styles/notfound.css';

export default function FirstMain() {
  return (
    <div className='notfound-container'>
      <main className='error'>
        <div className='error-txt'>
          <img className='sock-logo' src={require(`@/assets/sock-logo-color-crop.png`)} alt='logo' />
          <h1>내 맘에 쏙, 내 입에 쏙</h1>
          <h2>당신만을 위한 과자 추천 도우미</h2>
        </div>
        <img src={require(`@/assets/home/notfound-transparent.gif`)} alt='pageNotFound' />
      </main>
    </div>
  );
}
