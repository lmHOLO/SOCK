import React from 'react';
import '@/styles/notfound.css';

export default function FirstMain() {
  return (
    <div className='notfound-container'>
      <main className='error'>
        <div className='error-txt'>
          <img className='sock-logo' src={require(`@/assets/sock-logo-color-crop.png`)} alt='logo' />
          <h1>
            슬로건 슬로건 슬로건 <br /> 슬로건 슬로건 슬로건 슬로건
          </h1>
        </div>
        <img src={require(`@/assets/home/notfound-transparent.gif`)} alt='pageNotFound' />
      </main>
    </div>
  );
}
