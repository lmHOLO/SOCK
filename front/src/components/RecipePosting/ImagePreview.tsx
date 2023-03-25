import React from 'react';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
interface Props {
  image: File;
  deleteFunc: () => void;
}
export default function ImagePreview({ image, deleteFunc }: Props) {
  console.log(image);
  return (
    <div className='ImagePreview' draggable>
      {/* <img src={FileReader.readAsDataURL(image)} alt='preview' /> */}
      <div className='icon_container' onClick={deleteFunc}>
        <HighlightOffTwoToneIcon />
      </div>
    </div>
  );
}
