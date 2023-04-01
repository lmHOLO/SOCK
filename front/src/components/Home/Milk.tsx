import React from 'react';
import '@/styles/milk.css';
import { useNavigate } from 'react-router';

export default function Milk() {
  /* const myButton = document.getElementById('myButton');
  myButton &&
    myButton.addEventListener('click', function () {
      myButton.classList.add('clicked');
    }); */
  const navigate = useNavigate();
  const clickEvent = () => {
    navigate('/snack-content/MILK');
  };

  return (
    <div className='milk-container'>
      {/* <a id='myButton' href='#' data-text='CSS쯜꺼워'></a> */}
      <div className='milk-letter'>
        <img src={require(`@/assets/home/milk_main_letter.png`)} alt='milk' />
      </div>

      <div className='milk-text-container'>
        <h1>우유와 함께</h1>
        <button className='more-button' onClick={clickEvent}>
          더 알아보기
        </button>
      </div>
      <div className='milk-main'>
        <img src={require(`@/assets/home/milk_main.png`)} alt='milk' />
      </div>
    </div>
  );
}
