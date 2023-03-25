import React, { useState } from 'react';
import TopNavOnlyBack from '@/components/Navbar/TopNavOnlyBack';
import styles from '@/styles/recipe_posting.module.css';
import DragAndDrop from '@/components/RecipePosting/DragAndDrop';
import UploadImage from '@/components/RecipePosting/UploadImage';
import RecipeCropImage from './RecipeCropImage';
import { PostingTabType } from '@/types/recipe';
import PostingCropTopNav from '@/components/Navbar/PostingCropTopNav';

export default function RecipePosting() {
  const [tab, setTab] = useState<PostingTabType>('SELECT_IMAGE');
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  // const [cropedFiles, setCropedFiles] = useState<File[]>([]);
  return (
    <div className='side-margin'>
      {tab === 'SELECT_IMAGE' && (
        <>
          <TopNavOnlyBack />
          <UploadImage setTab={setTab} originFiles={originFiles} setOriginFiles={setOriginFiles} />
        </>
      )}
      {tab === 'CROP_IMAGE' && (
        <>
          <PostingCropTopNav />
          <RecipeCropImage originFiles={originFiles} />
        </>
      )}
      {tab === 'WRITE_CONTENT' && (
        <>
          <TopNavOnlyBack />
        </>
      )}
    </div>
  );
}
