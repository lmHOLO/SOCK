import React, { useState, useEffect } from 'react';
import useMember from '@/hooks/memberHook';
import TopNavOnlyBack from '@/components/Navbar/TopNavOnlyBack';
import styles from '@/styles/recipe_posting.module.css';
import UploadImage from '@/components/RecipePosting/UploadImage';
import RecipeCropImage from '@/components/RecipePosting/RecipeCropImage';
import { PostingTabType, PostSnackTagType } from '@/types/recipe';
import PostingCropTopNav from '@/components/Navbar/PostingCropTopNav';
import getCroppedImg from '@/utils/cropImage';
import Images from '@/components/RecipePosting/Images';
import WriteContent from '@/components/RecipePosting/WriteContent';
import WriteTitle from '@/components/RecipePosting/WriteTitle';
import TagList from '@/components/RecipePosting/TagList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tag from '@/components/RecipePosting/Tag';
import PostingUploadTopNav from '@/components/Navbar/PostingUploadTopNav';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// firebase 관련
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';
import { resolve } from 'path';
import { postRecipeAPI } from '@/apis/api/recipeDetail';
import { useNavigate } from 'react-router';
import SnackModal from '@/components/RecipePosting/SnackModal';
export default function RecipePosting() {
  const [tab, setTab] = useState<PostingTabType>('SELECT_IMAGE');
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<File>(originFiles[0]);
  const [croppedFiles, setCroppedFiles] = useState<File[]>([]);
  const [croppedImageList, setCroppedImageList] = useState<any>([]); // 프리뷰로 보여줄 거
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tagList, setTagList] = useState<PostSnackTagType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // const [cropedFiles, setCropedFiles] = useState<File[]>([]);
  let imageUrlList: string[] = [];
  const navigate = useNavigate();
  const handleUploadButton = async () => {
    console.log('click!');
    console.log('originFiles: ', originFiles);
    /*     await uploadFiles();
    await postRecipeAPI({
      content: content,
      images: imageUrlList,
      title: title,
      snackIds: tagList.map((tag) => tag.id),
    }).then((result) => {
      console.log(result);
      navigate('/');
    }); */
    await uploadFiles().then(async (result) => {
      console.log('title: ', title);
      console.log('content: ', content);
      console.log('tagList: ', tagList);
      console.log('imageUrlList: ', imageUrlList);
      result &&
        (await postRecipeAPI({
          content: content,
          images: imageUrlList,
          title: title,
          snackIds: tagList.map((tag) => tag.id),
        }).then((result) => {
          console.log(result);
          navigate('/');
        }));
    });
    /* for (const file of originFiles) {
      handleUploadFile(file);
    } */
  };
  const addTag = (snack: PostSnackTagType) => {
    setTagList([...tagList, snack]);
    console.log(snack);
    console.log(tagList);
  };

  const deleteTag = (id: string) => {
    setTagList(tagList.filter((tag) => tag.id !== id));
  };

  const uploadFiles = async () => {
    return new Promise<boolean>(async (resolve) => {
      for await (const file of originFiles) {
        await handleUploadFile(file);
      }
      resolve(true);
    });
  };

  // 파이어베이스 관련
  const handleUploadFile = (imageFile: File) => {
    return new Promise<void>((resolve) => {
      if (imageFile) {
        const name = imageFile.name;
        const storageRef = ref(storage, `image/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // setProgressUpload(progress); // to show progress upload
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            console.error(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              let now = new Date();
              let File_id = name + ' + ' + now;
              imageUrlList.push(url);
              console.log('storage에 파일 업로드 성공 url: ', url);
              console.log('File_id: ', File_id);
              console.log('File_Title: ', name);
              console.log('Create_Date: ', now);
              console.log(imageUrlList);
              resolve();
            });
          },
        );
      } else {
        console.error('File not found');
      }
    });
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
            {tagList.map((tag, index) => (
              <div key={index}>
                <Tag key={tag.id} tag={tag} />
                <HighlightOffIcon onClick={() => deleteTag(tag.id)} />
              </div>
            ))}
            {tagList.length === 0 && <p>태그를 추가해보세요!</p>}
            <AddCircleIcon className={styles['color-brown']} onClick={() => setModalOpen(true)} />
          </div>
          <SnackModal modalOpen={modalOpen} setModalOpen={setModalOpen} addTag={addTag} />
          {/* <SnackModal modalOpen={modalOpen} setModalOpen={setModalOpen} addTag={addTag} /> */}
          <WriteContent setContent={setContent} />
        </>
      )}
    </div>
  );
}
