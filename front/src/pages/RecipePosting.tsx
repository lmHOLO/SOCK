import React, { useState, useEffect } from 'react';
import TopNavOnlyBack from '@/components/Navbar/TopNavOnlyBack';
import styles from '@/styles/recipe_posting.module.css';
import UploadImage from '@/components/RecipePosting/UploadImage';
import RecipeCropImage from '@/components/RecipePosting/RecipeCropImage';
import { PostingTabType, SnackTagType } from '@/types/recipe';
import PostingCropTopNav from '@/components/Navbar/PostingCropTopNav';
import getCroppedImg from '@/utils/cropImage';
import Images from '@/components/RecipePosting/Images';
import WriteContent from '@/components/RecipePosting/WriteContent';
import WriteTitle from '@/components/RecipePosting/WriteTitle';
import TagList from '@/components/RecipePosting/TagList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tag from '@/components/RecipePosting/Tag';
import PostingUploadTopNav from '@/components/Navbar/PostingUploadTopNav';
export default function RecipePosting() {
  const [tab, setTab] = useState<PostingTabType>('SELECT_IMAGE');
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>(originFiles[0]);
  const [croppedFiles, setCroppedFiles] = useState<File[]>([]);
  const [croppedImageList, setCroppedImageList] = useState<any>([]); // 프리뷰로 보여줄 거
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tagList, setTagList] = useState<SnackTagType[]>([]);
  // const [cropedFiles, setCropedFiles] = useState<File[]>([]);

  const handleUploadButton = () => {
    console.log('click!');
    console.log('originFiles: ', originFiles);
    console.log('tagList: ', tagList);
    console.log('title: ', title);
    console.log('content: ', content);
  };
  return (
    <div className='side-margin'>
      {tab === 'SELECT_IMAGE' && (
        <>
          <TopNavOnlyBack />
          <UploadImage setTab={setTab} originFiles={originFiles} setOriginFiles={setOriginFiles} />
        </>
      )}
      {tab === 'CROP_IMAGE' && (
        <>
          <PostingCropTopNav />
          <RecipeCropImage
            setTab={setTab}
            originFiles={originFiles}
            setCroppedFiles={setCroppedFiles}
            setCroppedImageList={setCroppedImageList}
          />
        </>
      )}
      {tab === 'WRITE_CONTENT' && (
        <>
          <PostingUploadTopNav handleUploadButton={handleUploadButton} />
          <Images originFiles={originFiles} />
          <WriteTitle setTitle={setTitle} />
          <div className={styles['tag-container']}>
            {tagList.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
            {tagList.length === 0 && <p>태그를 추가해보세요!</p>}
            <AddCircleIcon className={styles['color-brown']} />
          </div>

          <WriteContent setContent={setContent} />
        </>
      )}
    </div>
  );
}
