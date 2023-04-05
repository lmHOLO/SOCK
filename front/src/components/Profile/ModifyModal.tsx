import React, { useCallback, useRef, useState } from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import styles from '@/styles/profile_modal.module.css';
import { MemberProfileType, UpdateProfileType, ProfileType } from '@/types/member';

import useMember from '@/hooks/memberHook';
import { updateProfileAPI } from '@/apis/api/member';
import { loginApi, otherMemberProfileApi, checkNicknameDuplicationAPI } from '@/apis/api/member';

interface Props {
  member: MemberProfileType;
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setMember: React.Dispatch<React.SetStateAction<MemberProfileType>>;
}
export default function ModifyModal({ modalOpen, setModalOpen, member, id, setMember }: Props) {
  const { memberData } = useMember();

  const handleClose = () => {
    setModalOpen(false);
    // setNickname(member.nickname);
    // setContent(member.profile.content);
  };
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [nickname, setNickname] = useState(member.nickname);
  const [content, setContent] = useState(member.profile.content);
  const [checkNickname, setCheckNickname] = useState('');
  const [check, setCheck] = useState(Boolean);

  const handleNicknameInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    checkNicknameDuplicationAPI(e.target.value).then((data) => {
      if (data == false) {
        setCheck(false);
        setCheckNickname('닉네임 중복입니다. 다시 작성해주세요.');
      } else {
        if (e.target.value.length > 0) {
          setCheck(true);
          setCheckNickname('닉네임 사용가능합니다.');
        } else {
          setCheck(false);
          setCheckNickname('닉네임을 작성해주세요.');
        }
      }
    });

    setNickname(e.target.value);
  };
  const handleContentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleResizeHeight = useCallback(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);

  const handleModifyBtnClick = () => {
    let newProfile = {
      image: member.profile.image,
      content: content,
    };

    let newUpdateProfile = {
      nickname: nickname,
      profile: newProfile,
    };
    if (check == false) {
      return;
    } else {
      updateProfileAPI(newUpdateProfile).then(() => {
        if (id == memberData.id) {
          loginApi().then((data) => {
            setMember(data);
          });
        } else if (id) {
          otherMemberProfileApi(id).then((data) => {
            setMember(data);
          });
        }
      });
    }

    handleClose();
  };
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <div className={styles['profile-modal-container']}>
            <img
              src={require(`@/assets/home/btn_close.png`)}
              alt='close-button'
              className={styles['close-btn']}
              onClick={() => handleClose()}
            />
            <div className={styles['content']}>
              <img src={member.profile.image} alt={member.nickname} />
              <div className={styles['input-container']}>
                <p>닉네임 </p>
                <input
                  type='text'
                  onChange={handleNicknameInput}
                  defaultValue={nickname ? nickname : member.nickname}
                />
              </div>
              <div className={check ? styles['p-CheckNickTrue'] : styles['p-CheckNickFalse']}>
                <p>{checkNickname}</p>
              </div>
              <div className={styles['textarea-container']}>
                <p>소개 </p>
                <textarea
                  rows={1}
                  ref={textRef}
                  onInput={handleResizeHeight}
                  onChange={handleContentInput}
                  value={content ? content : member.profile.content}
                />
              </div>
            </div>
            <button disabled={!check} className={styles['modify-button']} onClick={() => handleModifyBtnClick()}>
              수정하기
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
