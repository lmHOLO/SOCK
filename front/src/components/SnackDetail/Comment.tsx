import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '@/styles/comment.module.css';
import CommentList from './CommentList';
import CommentRating from './CommentRating';

import { ReviewType } from '@/types/snack';
import { postSnackReviewAPI, getSnackReviewsAPI, getSnackDetailApi } from '@/apis/api/snackDetail';
import { getMyReview, getOtherReviewList } from '@/apis/services/snackDetail';

interface Props {
  starAvg: number;
  setStarAvg: React.Dispatch<React.SetStateAction<number>>;
}

export default function Comment({ setStarAvg, starAvg }: Props) {
  const { id } = useParams();
  const textRef = useRef<HTMLTextAreaElement>(null);
  let [comment, setComment] = useState('');
  let [isValid, setIsValid] = useState(false);
  let [starPoint, setStarPoint] = useState(-1);

  const [commentList, setCommentList] = useState<ReviewType[]>([]);
  useEffect(() => {
    setComment('');
    if (textRef && textRef.current) {
      textRef.current.style.height = 'auto';
    }
  }, [id]);

  const handleResizeHeight = useCallback(() => {
    if (textRef && textRef.current) {
      textRef.current.style.height = 'auto';
      textRef.current.style.height = textRef.current.scrollHeight + 'px';
    }
  }, []);
  const delSpace = (data: string) => {
    return data.replace(/\s/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    let newComment = comment;
    let newStarPoint = starPoint + 1;
    if (delSpace(newComment) === '') {
      alert('댓글을 작성해주세요');
      setComment('');
      return;
    }
    if (starPoint < 0) {
      alert('별점을 등록해주세요');
      return;
    }
    // 리뷰 등록하기
    if (id && newStarPoint > 0) {
      postSnackReviewAPI(id, { content: comment.replace(/(?:\r\n|\r|\n)/g, '\n'), star: newStarPoint }).then(() => {
        getSnackReviewsAPI(id).then((data) => {
          const myReviewList = getMyReview(data);
          const otherReviewList = getOtherReviewList(data);

          if (myReviewList != null && otherReviewList != null) {
            const newList: ReviewType[] = [...[myReviewList], ...otherReviewList];
            setCommentList(newList);
            setIsValid(false);
          } else {
            setIsValid(true);
            const newList: ReviewType[] = [...otherReviewList];
            setCommentList(newList);
          }
        });

        getSnackDetailApi(id).then((data) => {
          if (data.numberOfParticipants == 0) setStarAvg(0);
          else setStarAvg(data.sumOfStars / data.numberOfParticipants);
        });

        setComment('');
        if (textRef && textRef.current) {
          textRef.current.style.height = 'auto';
        }
      });
    }
  };
  return (
    <div>
      {isValid && <CommentRating setStarPoint={setStarPoint} />}
      <div className={styles['comment-write']}>
        {isValid ? (
          <>
            <textarea
              rows={1}
              ref={textRef}
              className={styles.content_text}
              placeholder='댓글을 작성해주세요.'
              onInput={handleResizeHeight}
              onChange={handleChange}
              value={comment}
            />
            <button onClick={handleSubmit}>작성</button>
          </>
        ) : (
          <>
            <textarea rows={1} ref={textRef} className={styles.content_text} placeholder='이미 등록하셨습니다' disabled />
            <button disabled>작성</button>
          </>
        )}
      </div>
      {id && (
        <CommentList
          isValid={isValid}
          setIsValid={setIsValid}
          snackId={id}
          setStarAvg={setStarAvg}
          starAvg={starAvg}
          setCommentList={setCommentList}
          commentList={commentList}
        />
      )}
    </div>
  );
}
