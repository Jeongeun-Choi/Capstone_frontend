import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { ModalHeader, Modal } from '../../public/style';
import {
  LeftOutlined,
  ExclamationCircleTwoTone,
  HeartOutlined,
  HeartFilled,
  PlusOutlined
} from '@ant-design/icons';
import KakaoMap from '../map/KakaoMap';
import { Divider } from 'antd';
import JoinTeam from './JoinTeam';
import Setting from '../team/groupSetting/Setting';

const GroupContainer = styled.div`
  width: 100%;

  & .post-info {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .team-category {
    font-size: 14px;
  }
  & .team-name {
    font-size: 16px;
    font-weight: bold;
  }

  & .post-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: auto;

    & .big-img {
      margin-top: 20px;
      width: 100%;
      height: 30vh;
    }

    & .post-content-header {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      & .like {
        display: flex;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-color: #f6f6f6;

        & .anticon-heart {
          margin: auto;
          font-size: 16px;
          color: #eb5757;
        }
      }
    }

    & .team-info,
    .post-deadline,
    .team-location,
    .team-review,
    .team-qna {
      width: 90%;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    & .post-deadline,
    .team-location {
      display: flex;
    }

    & .subtitle {
      font-weight: bold;
      font-size: 15px;
      margin-right: 10px;
    }
    & .team-page {
      display: flex;
      width: 90%;
      margin-top: 25px;
      height: 90px;

      & .small-img {
        width: 45%;
        min-width: 160px;
        height: 90px;
      }

      & .team-page-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 5px;
      }
    }

    & .ant-divider {
      border-top: 1px solid #5f5f5f;
    }
  }
`;

const GroupHeader = styled(ModalHeader)`
  line-height: 25px;
  color: #ffffff;
  background-color: #aaabd3;

  & .anticon-exclamation-circle {
    position: absolute;
    top: 25px;
    right: 20px;
    font-size: 25px;
  }
`;

const Plus = styled.button`
  position: sticky;
  bottom: 1rem;
  left: 85%;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid #353866;
  background-color: #353866;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 9999;
`;

const GroupDetail = ({ data, setIsShowing }) => {
  const {
    id,
    name,
    ActiveCategories,
    GroupImages,
    Skills,
    groupIntro,
    location
  } = data;
  //TODO: 좋아요한 모집글인지 받아와서 초기값으로 선언하기
  const [filledHeart, setFilledHeart] = useState(false);
  const [isShowingSetting, setIsShowingSetting] = useState(false);

  const clickHeart = useCallback(() => {
    setFilledHeart(prev => !prev);
  }, []);

  const clickPlusButton = useCallback(() => {
    setIsShowingSetting(prev => !prev);
  }, []);

  const closeModal = useCallback(() => {
    setIsShowing(prev => !prev);
  }, []);

  return (
    <>
      <Modal>
        <GroupContainer>
          <GroupHeader>
            <LeftOutlined onClick={closeModal} />
            <div className="post-info">
              <div className="team-category">
                {ActiveCategories[0].DetailCategory.name}
              </div>
              <div className="team-name">
                {name} | {location.split(' ')[2]}
              </div>
            </div>
            <ExclamationCircleTwoTone twoToneColor="#DFDFEC" />
          </GroupHeader>
          <section className="post-content">
            <img
              className="big-img"
              src={GroupImages && GroupImages[0].URL}
              alt={GroupImages && GroupImages[0].description}
            />
            <div className="post-content-header">
              <div>
                <div className="team-category">
                  {ActiveCategories[0].DetailCategory.name}
                </div>
                <div className="team-name">
                  {name} | {location.split(' ')[2]}
                </div>
              </div>
              <div className="like" onClick={clickHeart}>
                {filledHeart ? <HeartFilled /> : <HeartOutlined />}
              </div>
            </div>
            <div className="team-info">
              <div className="subtitle">모임소개</div>
              <div className="team-info-textarea">{groupIntro}</div>
            </div>
            <div className="post-deadline">
              <div className="subtitle">마감일</div>
              <div>yyyy.mm.dd</div>
            </div>
            <div className="team-location">
              <div className="subtitle">모임 지역</div>
              <div>{location}</div>
            </div>
            <KakaoMap location={location} />
            <div className="team-page">
              <img
                className="small-img"
                src={GroupImages && GroupImages[0].URL}
                alt={GroupImages && GroupImages[0].description}
              />
              <div className="team-page-info">
                <div>{ActiveCategories[0].DetailCategory.name}</div>
                <div>{name}</div>
                <div>since 2019</div>
              </div>
            </div>
            <Divider />
            <div className="team-review">
              <div className="subtitle">모임 리뷰</div>
              <div>리뷰 컴포넌트 ~,~</div>
            </div>
            <Divider />
            <div className="team-qna">
              <div className="subtitle">모임 Q&amp;A</div>
              <div>QnA 컴포넌트 ~,~</div>
            </div>
          </section>
          <Plus type="button" onClick={clickPlusButton}>
            <PlusOutlined />
          </Plus>
        </GroupContainer>
      </Modal>
      {isShowingSetting && (
        <Setting setIsShowingSetting={setIsShowingSetting} />
      )}
    </>
  );
};

export default GroupDetail;
