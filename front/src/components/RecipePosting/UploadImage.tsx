import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import styles from '@/styles/recipe_posting.module.css';
import { PostingTabType } from '@/types/recipe';

import { v4 } from 'uuid';

interface Props {
  setTab: React.Dispatch<React.SetStateAction<PostingTabType>>;
  setOriginFiles: React.Dispatch<React.SetStateAction<File[]>>;
  originFiles: File[];
}
export default function PhotoList({ setTab, originFiles, setOriginFiles }: Props) {
  const fileTypes = ['png', 'jpeg', 'jpg'];
  const imageRegistHandler = (files: File[]) => {
    let tempImagelist = [...originFiles];
    for (let i = 0; i < files.length; i++) {
      const oldFile = files[i];
      const newName = v4();
      const newFile = new File([oldFile], newName + '.png', { type: oldFile.type });
      tempImagelist.push(newFile);
    }
    setOriginFiles(tempImagelist);
    setTab('WRITE_CONTENT');
  };
  return (
    <FileUploader
      handleChange={imageRegistHandler}
      name='file'
      types={fileTypes}
      multiple={true}
      hoverTitle='놓아주세요'
    >
      <button type='button' className={styles['upload-container']}>
        <img
          src={require(`@/assets/home/icon_photo.png`)}
          alt='AddPhotoAlternateIcon'
          className={styles['image-regist-btn']}
        />
      </button>
    </FileUploader>
  );
}
