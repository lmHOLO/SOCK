import React from 'react';
import '@/styles/milk.css';
import { useNavigate } from 'react-router';

export default function Milk() {
  const navigate = useNavigate();
  const clickEvent = () => {
    navigate('/snack-content/MILK');
  };

  return (
    <div className='milk-container'>
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
