import React from 'react';
import '@/styles/alchol.css';
import { useNavigate } from 'react-router';

export default function Alchol() {
  const myButton = document.getElementById('myButton');
  myButton &&
    myButton.addEventListener('click', function () {
      myButton.classList.add('clicked');
    });

  const navigate = useNavigate();
  const clickEvent = () => {
    navigate('/snack-content/ALCHOL');
  };

  return (
    <div className='alchol-container'>
      <div className='alchol-slogan'>
        <h1>술과함께</h1>
      </div>
      <div className='alchol-img'>
        <img src={require(`@/assets/home/alchol.png`)} alt='알코올' />
      </div>
      <div className='alchol-button'>
        <a id='myButton' data-text='더 알아보기' data-text-after="LET's Go" onClick={clickEvent}></a>
      </div>
    </div>
  );
}
