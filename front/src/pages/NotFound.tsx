import React from 'react';
import '@/styles/notfound.css';

export default function NotFound() {
  return (
    <div className='notfound-container'>
      <main className='error'>
        <img src={require(`@/assets/home/notfound.gif`)} alt='pageNotFound' />
        <div className='error-txt'>
          <h2>OOPS! ERROR</h2>
          <p>돌아오시면 더 맛있는 과자를 추천해드릴게요!</p>
          <a href='#'>
            <button className='btn'>메인페이지로</button>
          </a>
        </div>
      </main>

      <div className='footer'>
        <p className='footer-text'>
          created by&nbsp;
          <a href='https://j8c103.p.ssafy.io'>Team HOLO</a> - j8c103.p.ssafy.io
        </p>
      </div>
    </div>
  );
}
