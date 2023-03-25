import React from 'react';
import TopNavOnlyBack from '@/components/Navbar/TopNavOnlyBack';
import styles from '@/styles/recipe_posting.module.css';
import DragAndDrop from '@/components/RecipePosting/DragAndDrop';
import UploadImage from '@/components/RecipePosting/UploadImage';

export default function RecipePosting() {
  return (
    <div className='side-margin'>
      <TopNavOnlyBack />
      <UploadImage />
    </div>
  );
}
