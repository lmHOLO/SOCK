import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/recipe_posting.module.css';
import ImagePreview from './ImagePreview';

export default function DragAndDrop({ max = 10 }) {
  // const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  // const [previewImages, setPreviewImages] = useState([]);
  // const uploadBoxRef = useRef<HTMLLabelElement>(null);
  // const inputRef = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   const uploadBox = uploadBoxRef.current;
  //   const input = inputRef.current;
  //   const handleFiles = (files: FileList) => {
  //     for (const file of files) {
  //       if (!file.type.startsWith('image/')) continue;
  //       const reader = new FileReader();
  //       reader.onloadend = (e: ProgressEvent<FileReader>) => {
  //         if (e.target && e.target.result) {
  //           const result = e.target.result;
  //           console.log(result);
  //           // setUploadedImages([...uploadedImages, result].slice(0, max));
  //           // setUploadedImages(uploadedImages.concat([result]).slice(0, max));
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };
  //   const changeHandler = (event: Event) => {
  //     const files = (event.target as HTMLInputElement).files;
  //     files && handleFiles(files);
  //   };
  //   const dropHandler = (event: DragEvent) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //     if (event.dataTransfer) {
  //       const files = event.dataTransfer.files;
  //       handleFiles(files);
  //     }
  //   };
  //   const dragOverHandler = (event: DragEvent) => {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   };
  //   if (uploadBox && input) {
  //     uploadBox.addEventListener('drop', dropHandler);
  //     uploadBox.addEventListener('dragover', dragOverHandler);
  //     input.addEventListener('change', changeHandler);
  //     return () => {
  //       uploadBox.removeEventListener('drop', dropHandler);
  //       uploadBox.removeEventListener('dragover', dragOverHandler);
  //       input.removeEventListener('change', changeHandler);
  //     };
  //   }
  // }, [max]);
  // useEffect(() => {
  //   if (uploadedImages) {
  //     let imageJSXs: File[] = [];
  //     imageJSXs = uploadedImages.map((image: File, index: number) => {
  //       const isDeleteImage = (element: File) => {
  //         return element === image;
  //       };
  //       const deleteFunc = () => {
  //         uploadedImages.splice(uploadedImages.findIndex(isDeleteImage), 1);
  //         setUploadedImages([...uploadedImages]);
  //       };
  //       return <ImagePreview image={image} deleteFunc={deleteFunc} key={index} />;
  //     });
  //     setPreviewImages(imageJSXs);
  //   }
  // }, [uploadedImages]);
  // return (
  //   <div className='ImageUploadBox'>
  //     <label className='drag_or_click' htmlFor='fileInput' ref={uploadBoxRef}>
  //       <div className='text_box'>
  //         <h3>드래그 또는 클릭하여 업로드</h3>
  //         <span>권장사항: oooMB 이하 고화질</span>
  //       </div>
  //       <div className='icon_box'>
  //         <i className='fas fa-arrow-circle-up'></i>
  //       </div>
  //     </label>
  //     <input type='file' multiple accept='image/*' id='fileInput' ref={inputRef} />
  //     <div className='preview_wrapper'>
  //       <div className='preview_container'>{previewImages}</div>
  //     </div>
  //   </div>
  // );
}
