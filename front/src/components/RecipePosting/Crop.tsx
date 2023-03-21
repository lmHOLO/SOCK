import React, { useState, createRef } from 'react';
import { Cropper, getCroppedImg } from 'react-cropper-custom';
import 'react-cropper-custom/dist/index.css';
import styles from '@/styles/crop.module.css';
// import Cropper, { ReactCropperElement } from 'react-cropper';
// import 'cropperjs/dist/cropper.css';
// import styles from '@/styles/crop.module.css';
import { Area } from '@/types';
interface Props {
  photo: File;
  index: number;
}
export default function Crop({ photo, index }: Props) {
  const IMAGE = URL.createObjectURL(photo);
  const [img, setImg] = useState(IMAGE);
  const [zoom, setZoom] = useState(1);
  console.log('시작');
  const onCropComplete = async (croppedArea: Area) => {
    console.log(croppedArea);
    // try {
    //   console.log('dd');
    const canvasSize = {
      width: 1200,
      height: 1200,
    };
    const newImage = await getCroppedImg(img, croppedArea, canvasSize);
    console.log(newImage);

    //   const image = await getCroppedImg(IMAGE, croppedArea, canvasSize);
    //   setImg(image);
    // } catch (e) {
    //   console.error(e);
    // }
  };
  return (
    // <div className={styles['content']}>
    <div className={styles['wrapper']}>
      <Cropper src={IMAGE} zoom={zoom} onZoomChange={setZoom} onCropComplete={onCropComplete} />
    </div>
    // </div>
  );
}
