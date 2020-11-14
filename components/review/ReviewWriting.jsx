import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Review from './Review';
import styled from '@emotion/styled';
import { Modal, ModalHeader } from '../../public/style';
import { LeftOutlined } from '@ant-design/icons';
import { Rate, message } from 'antd';
import useInputChangeHook from '../../hooks/useInputChangeHook';
import customAxios from '../../utils/baseAxios';

const ReviewWritingHeader = styled(ModalHeader)`
  line-height: 10vh;
  color: black;
  background-color: white;
`;

const ReviewWritingContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & main {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.6rem;

    & .writing {
      width: 100%;
      height: 15rem;
      background-color: #f6f6f6;
      border-radius: 3px;
      margin-top: 0.5rem;

      & .writing-text-only {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 15rem;
        & .writing-first {
          font-size: 0.6rem;
        }

        & .writing-second {
          font-size: 0.9rem;
          font-weight: bold;
        }
      }

      & .writing-input {
        width: 100%;
        height: 15rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        & .review-input-div {
          width: 95%;
          display: flex;
          flex-direction: column;
          margin-top: 0.5rem;

          & label {
            font-weight: bold;
            font-size: 0.8rem;
          }

          & input {
            background-color: rgba(255, 255, 255, 0);
            border: none;
            height: 1.5rem;
          }

          & textarea {
            width: 100%;
            resize: none;
            background-color: rgba(255, 255, 255, 0);
            border: none;
          }
          & .ant-rate {
            margin-top: -0.3rem;
            & .ant-rate-star {
              font-size: 0.9rem;
            }
          }
        }

        & .review-input-buttons {
          width: 95%;
          display: flex;

          & button {
            width: 20%;
            height: 2rem;
            border: none;
            border-radius: 5px;
            //background-color: #6055cd;
            background-color: #868686;
            color: #ffffff;
            margin-right: 1rem;
            margin-top: 1rem;
          }
        }
      }
    }
  }
`;

const ReviewWriting = ({ id, type, setCloseModal }) => {
  const [showWriting, setShowWriting] = useState(false);
  const [title, onChangeTitle] = useInputChangeHook('');
  const [score, setScore] = useState(5);
  const [contents, onChangeContents] = useInputChangeHook('');
  const [reviews, setReviews] = useState([]);
  const { me } = useSelector(state => state.user);

  const onClose = useCallback(() => {
    setCloseModal(prev => !prev);
  }, []);

  const onChangeScore = useCallback(value => {
    setScore(value);
  }, []);

  const onToggle = useCallback(e => {
    e.preventDefault();
    setShowWriting(prev => !prev);
  }, []);

  const onSubmitReview = useCallback(
    async e => {
      e.preventDefault();

      if (!title.trim() || !contents.trim()) {
        return message.error('모두 다 채워주세요.');
      }
      const data = { evaluatorId: me.id, title, score, contents, type: 'G' };

      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      if (type === 'person') {
        data.evaluateeId = id;
        data.evaluatedGroupId = null;
      } else {
        data.evaluatedGroupId = parseInt(id);
        data.evaluateeId = null;
      }
      try {
        await customAxios.post(`/evaluation`, data);
        data.createdAt = `${year}-${month}-${day}`;
        setReviews([...reviews, data]);
        setShowWriting(prev => !prev);
      } catch (error) {
        console.log(error);
      }
    },
    [title, contents, score, me, reviews]
  );

  const getReviews = async () => {
    const { data } = await customAxios.get(
      `/evaluation?evaluatedGroupId=${id}`
    );
    setReviews(data.evaluates);
  };

  useEffect(() => {
    getReviews();
  }, [id]);

  return (
    <Modal zIndex={3}>
      <ReviewWritingContainer>
        <ReviewWritingHeader>
          <LeftOutlined onClick={onClose} />
          <h3>모임 평가</h3>
        </ReviewWritingHeader>
        <main>
          <Review groupId={id} reviews={reviews} />
          <section className="writing">
            {showWriting ? (
              <div className="writing-input">
                <div className="review-input-div">
                  <label htmlFor="review-title">제목</label>
                  <input
                    id="review-title"
                    placeholder="리뷰 제목"
                    value={title}
                    onChange={onChangeTitle}
                  />
                </div>
                <div className="review-input-div">
                  <label htmlFor="review-rate">평점</label>
                  <Rate
                    allowHalf
                    defaultValue={score}
                    value={score}
                    onChange={onChangeScore}
                  />
                </div>
                <div className="review-input-div">
                  <label htmlFor="review-content">내용</label>
                  <textarea
                    placeholder="리뷰 내용"
                    value={contents}
                    onChange={onChangeContents}
                  ></textarea>
                </div>
                <div className="review-input-buttons">
                  <button onClick={onSubmitReview}>등록</button>
                  <button type="button" onClick={onToggle}>
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="writing-text-only" onClick={onToggle}>
                <div className="writing-first">
                  “아직 이 모임에 대한 리뷰를 작성하지 않았어요.”
                </div>
                <div className="writing-second">클릭하여 리뷰작성하기</div>
              </div>
            )}
          </section>
        </main>
      </ReviewWritingContainer>
    </Modal>
  );
};

export default ReviewWriting;
