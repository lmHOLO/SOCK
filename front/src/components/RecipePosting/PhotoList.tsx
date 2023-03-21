import React, { useState, useRef } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import styles from '@/styles/recipe_posting.module.css';
import Crop from './Crop';
import Carousel from 'react-material-ui-carousel';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
        <Carousel
          autoPlay={false}
          cycleNavigation={false}
          NextIcon={<ChevronRightIcon />}
          PrevIcon={<ChevronLeftIcon />}
          swipe={false}
          navButtonsAlwaysVisible={true}
        >
          {imageList.map((photo, index) => (
            <Crop key={index} photo={photo} index={index} />
          ))}
        </Carousel>
        <FileUploader
          handleChange={imageRegistHandler}
          name='file'
          types={fileTypes}
          multiple={true}
          hoverTitle='놓아주세요'
          // onDraggingStateChange={(dragging: boolean) => setIsDrag(dragging)}
        >
          <button type='button' className={styles['image-regist-btn']}>
            이미지 추가하기
          </button>
        </FileUploader>
      </div>
    </div>
  );
}
