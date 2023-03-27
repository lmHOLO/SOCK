import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import Slider from '@mui/material/Slider';
import styles from '@/styles/crop.module.css';
import getCroppedImg from '@/utils/cropImage';
import { Button } from '@mui/material';
import { PostingTabType } from '@/types/recipe';
interface Props {
  setTab: React.Dispatch<React.SetStateAction<PostingTabType>>;
  originFiles: File[];
  setCroppedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setCroppedImageList: React.Dispatch<React.SetStateAction<any>>;
}
export default function RecipeCropImage({ setTab, originFiles, setCroppedFiles }: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File>(originFiles[0]);
  const [cropIndex, setCropIndex] = useState<number>(0);

  const selectedImg = URL.createObjectURL(selectedFile);
  let croppedImageList = new Array(originFiles.length);

  // 인덱스 바뀔 시
  useEffect(() => {
    setSelectedFile(originFiles[cropIndex]);
  }, [originFiles]);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(selectedImg, croppedAreaPixels);
      console.log('이미지', { croppedImage });
      croppedImageList.push(croppedImage);
      console.log(croppedImageList);
      setCroppedImage(croppedImage);
      if (cropIndex === originFiles.length - 1) {
        setTab('WRITE_CONTENT');
      } else {
        setCropIndex(cropIndex + 1);
        setSelectedFile(originFiles[cropIndex]);
      }
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <div>
      <div className={styles['crop-container']}>
        <Cropper
          image={selectedImg}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className={styles['controls']}>
        <Slider
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          aria-labelledby='Zoom'
          onChange={(e, zoom) => setZoom(Number(zoom))}
          classes={{ root: 'slider' }}
        />
      </div>
      <Button onClick={showCroppedImage} variant='contained' color='primary'>
        NEXT
      </Button>
      <img src={croppedImage} alt='' />
    </div>
  );
}
