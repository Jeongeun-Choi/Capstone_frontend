import React from 'react';
import styled from '@emotion/styled';
import { Rate } from 'antd';

const ReviewContentContainer = styled.div`
  width: 100%;
  /* height: 6rem; */
  margin-top: 0.7rem;
  background-color: #f6f6f6;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .review_content_header {
    margin-top: 0.3rem;
    width: 95%;
    display: flex;
    justify-content: space-between;

    & .review_content_header_right {
      font-size: 0.8rem;
      font-weight: bold;

      & .ant-rate {
        margin-top: -0.3rem;
        & .ant-rate-star {
          font-size: 0.9rem;
        }
      }
    }

    & .review_content_header_left {
      text-align: right;
      font-size: 0.5rem;
      color: #868686;
    }
  }

  & .review_content_main {
    width: 95%;
    margin-top: 0.5rem;
    margin-bottom: 0.3rem;
    font-size: 0.7rem;
  }
`;

const ReviewContent = ({ review }) => {
  return (
    <ReviewContentContainer>
      <section className="review_content_header">
        <div className="review_content_header_right">
          <div>{review.title}</div>
          <Rate disabled allowHalf defaultValue={review.score} />
        </div>
        <div className="review_content_header_left">
          <div>{review.createdAt.split(' ')[0]}</div>
          <div>{review.name}</div>
        </div>
      </section>
      <section className="review_content_main">{review.contents}</section>
    </ReviewContentContainer>
  );
};

export default ReviewContent;
