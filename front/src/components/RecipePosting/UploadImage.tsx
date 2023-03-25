import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import styles from '@/styles/recipe_posting.module.css';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
export default function PhotoList() {
  const [imageList, setImageList] = useState<File[]>([]);
  const fileTypes = ['png', 'jpeg'];
  // image 추가 시 핸들링 함수
  const imageRegistHandler = (files: File[]) => {
    let tempImagelist = [...imageList];
    for (let i = 0; i < files.length; i++) {
      tempImagelist.push(files[i]);
    }
    console.log(tempImagelist);
    setImageList(tempImagelist);
  };
  return (
    <FileUploader
      handleChange={imageRegistHandler}
      name='file'
      types={fileTypes}
      multiple={true}
      hoverTitle='놓아주세요'
      // onDraggingStateChange={(dragging: boolean) => setIsDrag(dragging)}
    >
      <button type='button' className={styles['upload-container']}>
        <AddPhotoAlternateIcon />
      </button>
    </FileUploader>
  );
}
