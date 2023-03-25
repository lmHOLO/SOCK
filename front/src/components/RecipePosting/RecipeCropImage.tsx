import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Point, Area } from 'react-easy-crop/types';
import Slider from '@mui/material/Slider';
import styles from '@/styles/crop.module.css';
import getCroppedImg from './cropImage';
import { Button } from '@mui/material';
interface Props {
  originFiles: File[];
}
export default function RecipeCropImage({ originFiles }: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<any>(null);
  const dogImg = 'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';
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
      const croppedImage = await getCroppedImg(dogImg, croppedAreaPixels);
      console.log('donee', { croppedImage });

      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);
  return (
    <div>
      <div className='crop-container'>
        <Cropper
          image={dogImg}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className='controls'>
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
        Show Result
      </Button>
      <img src={croppedImage} alt='' />
    </div>
  );
}
