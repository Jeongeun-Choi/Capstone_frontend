import React from 'react';
import Review from './Review';
import styled from '@emotion/styled';
import { Modal, ModalHeader } from '../../public/style';
import { LeftOutlined } from '@ant-design/icons';

const ReviewWritingHeader = styled(ModalHeader)`
  line-height: 25px;
  color: black;
  background-color: white;

  & .post-info {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .team-category {
      font-size: 14px;
    }

    & .team-name {
      font-size: 16px;
      font-weight: bold;
    }
  }
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
    & .writing {
      width: 100%;
      height: 12rem;
      background-color: #f6f6f6;
      border-radius: 3px;
      margin-top: 0.5rem;
    }
  }
`;

const ReviewWriting = () => {
  return (
    <Modal>
      <ReviewWritingContainer>
        <ReviewWritingHeader>
          <LeftOutlined />
          <div className="post-info">
            <div className="team-category">
              카테고리
              {/* {data.ActiveCategories[0].DetailCategory.name} */}
            </div>
            <div className="team-name">
              모임명 | 시군구
              {/* {data.name} | {data.location.split(' ')[2]} */}
            </div>
          </div>
        </ReviewWritingHeader>
        <main>
          <Review />
          <section className="writing"></section>
        </main>
      </ReviewWritingContainer>
    </Modal>
  );
};

export default ReviewWriting;
