import React, { useState, useRef } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import styles from '@/styles/recipe_posting.module.css';
import Crop from './Crop';
export default function PhotoList() {
  const [imageList, setImageList] = useState<File[]>([]);
  const fileTypes = ['png', 'jpeg'];
  // image 추가 시 핸들링 함수
  const imageRegistHandler = async (files: File[]) => {
    console.log(files);
    if (imageList.length + files.length > 10) {
      alert('이미지는 10장을 초과할 수 없습니다.');
      return;
    }
    let tempImagelist = [...imageList];
    // crop해서 파일 처리하기
    for (let i = 0; i < files.length; i++) {
      tempImagelist.push(files[i]);
    }
    console.log(tempImagelist);
    setImageList(tempImagelist);
  };

  return (
    <div>
      <div className={styles['photo-list-container']}>
        {imageList.map((photo, index) => (
          <Crop key={index} photo={photo} index={index} />
        ))}
        <FileUploader
          handleChange={imageRegistHandler}
          name='file'
          types={fileTypes}
          multiple={true}
          hoverTitle='놓아주세요'
          // onDraggingStateChange={(dragging: boolean) => setIsDrag(dragging)}
        >
          <button type='button' className={styles['image-regist-btn']}>
            {/* {!isDrag && <UploadFile />} */}
          </button>
        </FileUploader>
      </div>
    </div>
  );
}
