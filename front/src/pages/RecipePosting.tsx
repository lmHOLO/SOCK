import React from 'react';
import BottomNav from '@/components/Navbar/BottomNav';
import TopNav from '@/components/Navbar/TopNav';
import styles from '@/styles/recipe_posting.module.css';
import DragDrop from '@/components/RecipePosting/DragDrop';

export default function RecipePosting() {
  return (
    <div className='side-margin'>
      <TopNav />
      <button className={styles['posting-btn']}>자랑하기</button>

      <DragDrop />
      <BottomNav />
    </div>
  );
}
