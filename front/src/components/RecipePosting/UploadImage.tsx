import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import styles from '@/styles/recipe_posting.module.css';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useNavigate } from 'react-router-dom';
import { PostingTabType } from '@/types/recipe';
interface Props {
  setTab: React.Dispatch<React.SetStateAction<PostingTabType>>;
  setOriginFiles: React.Dispatch<React.SetStateAction<File[]>>;
  originFiles: File[];
}
export default function PhotoList({ setTab, originFiles, setOriginFiles }: Props) {
  // const [imageList, setImageList] = useState<File[]>([]);
  const fileTypes = ['png', 'jpeg'];
  // image 추가 시 핸들링 함수
  const imageRegistHandler = (files: File[]) => {
    // let tempImagelist = [...imageList];
    let tempImagelist = [...originFiles];
    for (let i = 0; i < files.length; i++) {
      tempImagelist.push(files[i]);
    }
    // console.log(tempImagelist);
    // setImageList(tempImagelist);

    setOriginFiles(tempImagelist);
    // setTab('CROP_IMAGE');
    setTab('WRITE_CONTENT');
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
