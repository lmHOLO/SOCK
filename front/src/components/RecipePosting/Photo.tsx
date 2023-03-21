import React from 'react';
interface Props {
  photo: File;
}
export default function Photo({ photo }: Props) {
  return (
    <div>
      <img src={URL.createObjectURL(photo)} alt='이미지' />
    </div>
  );
}
