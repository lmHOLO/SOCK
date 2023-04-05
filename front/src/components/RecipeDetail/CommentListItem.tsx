import React from 'react';
import { RecipeCommentType } from '@/types/recipe';
import styles from '@/styles/comment.module.css';
import useMember from '@/hooks/memberHook';

import { deleteRecipeCommentAPI, getRecipeCommentsAPI } from '@/apis/api/recipeDetail';
import { getGradeImage, getSbtiImage } from '@/utils/memberInfo';
import { useNavigate } from 'react-router';

interface Props {
  comment: RecipeCommentType;
  recipeId: string;
  commentList: RecipeCommentType[];
  setCommentList: React.Dispatch<React.SetStateAction<RecipeCommentType[]>>;
}
export default function CommentListItem({ comment, recipeId, commentList, setCommentList }: Props) {
  const { memberData } = useMember();
  const gradeImage = getGradeImage(comment.grade);
  const sbtiImage = getSbtiImage(comment.sbti);
  const navigate = useNavigate();
  const commentDeleteEvent = () => {
    if (comment) {
      deleteRecipeCommentAPI(recipeId, comment.commentId).then(() => {
        getRecipeCommentsAPI(recipeId).then((data) => {
          setCommentList(data.content);
        });
      });
    }
  };

  const timeStr = comment.createdDate; // 예제 시간 문자열
  // 정규식 사용하여 T와 ss 제거
  const newTimeStr = timeStr.replace(/T(\d{2}:\d{2}):\d{2}/, ' $1');

  return (
    <div className={styles['comment-item']}>
      <div className={styles['member-date']}>
        <div className={styles['member-data']} onClick={() => navigate(`/profile/${comment.memberId}`)}>
          <div className={styles['member-image']}>
            <img src={comment.memberImage} alt={comment.nickname} />
          </div>
          <p>{comment.nickname}</p>
          <div className={styles['grade-sbti']}>
            {gradeImage && <img src={`${gradeImage}`} alt={comment.grade} />}
            {sbtiImage && <img src={`${sbtiImage}`} alt={comment.sbti} />}
          </div>
        </div>
        <div className={styles['comment-data']}>
          <p>{newTimeStr}</p>
        </div>
      </div>
      <div className={styles['delete-btn-margin']}>
        {memberData.id === comment.memberId && (
          <button className={styles['delete-btn']} onClick={commentDeleteEvent}>
            삭제
          </button>
        )}
      </div>
      <pre className={styles['comment-content']}>{comment.content}</pre>
    </div>
  );
}
