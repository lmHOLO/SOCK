import React, { useState } from 'react';

import TopNavOnlyBack from '@/components/Navbar/TopNavOnlyBack';
import styles from '@/styles/recipe_posting.module.css';
import UploadImage from '@/components/RecipePosting/UploadImage';
import { PostingTabType, PostSnackTagType } from '@/types/recipe';
import Images from '@/components/RecipePosting/Images';
import WriteContent from '@/components/RecipePosting/WriteContent';
import WriteTitle from '@/components/RecipePosting/WriteTitle';
import Tag from '@/components/RecipePosting/Tag';
import PostingUploadTopNav from '@/components/Navbar/PostingUploadTopNav';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// firebase 관련
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';
import { postRecipeAPI } from '@/apis/api/recipeDetail';
import { useNavigate } from 'react-router';
import SnackModal from '@/components/RecipePosting/SnackModal';
import LoadingModal from '@/components/common/LoadingModal';

export default function RecipePosting() {
  const [tab, setTab] = useState<PostingTabType>('SELECT_IMAGE');
  const [originFiles, setOriginFiles] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [tagList, setTagList] = useState<PostSnackTagType[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  let imageUrlList: string[] = [];
  const navigate = useNavigate();
  const handleUploadButton = async () => {
    if (title && content.length >= 10 && tagList.length > 0) {
      setLoading(true);
      await uploadFiles().then(async (result) => {
        result &&
          (await postRecipeAPI({
            content: content.replace(/(?:\r\n|\r|\n)/g, '\n'),
            images: imageUrlList,
            title: title,
            snackIds: tagList.map((tag) => tag.id),
          }).then((result) => {
            navigate(`/recipes/${result.data}`);
          }));
      });
      setLoading(false);
    } else if (!title) {
      alert('제목을 입력해주세요.');
    } else if (!tagList || tagList.length <= 0) {
      alert('1개 이상의 태그를 포함해주셔야 게시가 가능합니다.');
    } else if (content.length < 10) {
      alert('게시물은 10자 이상 작성해주셔야 게시가 가능합니다.');
    } else {
      alert('게시물을 작성할 수 없습니다. 제목, 태그, 내용을 확인 후 재작성 부탁드립니다.');
    }
  };

  const addTag = (snack: PostSnackTagType) => {
    setTagList([...tagList, snack]);
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
            switch (snapshot.state) {
              case 'paused':
                break;
              case 'running':
                break;
            }
          },
          (error) => {
            console.error(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              imageUrlList.push(url);
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
      {tab === 'WRITE_CONTENT' && (
        <>
          <PostingUploadTopNav handleUploadButton={handleUploadButton} />
          <Images originFiles={originFiles} />
          <WriteTitle setTitle={setTitle} />
          <div className={styles['tag-container']}>
            {tagList.map((tag, index) => (
              <div key={index} className={styles['tag-item']}>
                <HighlightOffIcon onClick={() => deleteTag(tag.id)} />
                <Tag key={tag.id} tag={tag} />
              </div>
            ))}
            {tagList.length === 0 && <p>태그를 추가해보세요!</p>}
            <img
              src={require(`@/assets/home/btn_close.png`)}
              alt='close-button'
              className={styles['add-btn']}
              onClick={() => setModalOpen(true)}
            />
            {/* <AddCircleIcon className={styles['color-brown']} onClick={() => setModalOpen(true)} /> */}
          </div>
          <SnackModal modalOpen={modalOpen} setModalOpen={setModalOpen} addTag={addTag} />
          <WriteContent setContent={setContent} />
        </>
      )}
      {loading && <LoadingModal />}
    </div>
  );
}
