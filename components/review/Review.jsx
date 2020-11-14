import React from 'react';
import ReviewContent from './ReviewContent';
import styled from '@emotion/styled';

const ReviewContainer = styled.div`
  width: 100%;

  header {
    width: 100%;
    display: flex;
    justify-content: space-between;

    & .header_right {
      & .header_right_score {
        font-size: 1.2rem;
        font-weight: bold;
      }

      & .header_right_info {
        font-size: 0.5rem;
      }
    }

    & .header_left {
      font-size: 0.5rem;
      color: #868686;
    }
  }
`;

const reviews = [
  {
    id: 1,
    title: '좋은 사람들과 주말을 즐겁게!',
    contents: '이 모임은 친근해서 좋아요! 기회가 된다면 다시 들어가고싶네요!',
    score: 4,
    evaluatorId: 3,
    email: 'test11@naver.com',
    name: '테스트용입니당',
    createdAt: '2020-10-20'
  },
  {
    id: 2,
    title: '원하던 바로 그 모임ㅎㅎ',
    contents:
      '주말에 취미생활을 하면서 알차게 보내고 싶어서 가입했는데, 취미 생활 이상으로 배워가는 것도 많고 큰 즐거움을 느끼고 있습니다.',
    score: 5,
    evaluatorId: 8,
    email: 'wjddms3080@naver.com',
    name: '테스트용입니당2',
    createdAt: '2020-11-01'
  }
];

const Review = () => {
  return (
    <ReviewContainer>
      <header>
        <div className="header_right">
          <div className="header_right_score">
            {(
              reviews.reduce((total, review) => review.score + total, 0) /
              reviews.length
            ).toFixed(1)}
          </div>
          <div className="header_right_info">5점 만점 기준</div>
        </div>
        <div className="header_left">전체 리뷰 보기</div>
      </header>
      {reviews?.length
        ? reviews.map(review => (
            <ReviewContent key={review.id} review={review} />
          ))
        : ''}
    </ReviewContainer>
  );
};

export default Review;
