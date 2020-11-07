import React, { useState, useCallback, useEffect } from 'react';
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
import customAxios from '../../utils/baseAxios';
import MakingGroup from '../team/MakingGroup';

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

  & .group-content {
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

    & .group-content-header {
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

    & .group-content-item {
      width: 90%;
      margin-top: 5px;
      margin-bottom: 5px;
      & .group-content-item-time-div {
        display: flex;

        & div {
          margin-right: 5px;
        }
      }
    }

    & .group-location {
      width: 90%;
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
  background-color: #6055cd;

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

const GroupDetail = ({ setIsShowing, groupId }) => {
  const [modify, setModify] = useState(false);
  const [data, setData] = useState(null);
  //TODO: 좋아요한 모집글인지 받아와서 초기값으로 선언하기
  const [filledHeart, setFilledHeart] = useState(false);
  const [isShowingSetting, setIsShowingSetting] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    const { data } = await customAxios.get(`/groups/${groupId}`);
    setData(data.group);
  }, [groupId]);

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
      {data && (
        <Modal>
          <GroupContainer>
            <GroupHeader>
              <LeftOutlined onClick={closeModal} />
              <div className="post-info">
                <div className="team-category">
                  {data.ActiveCategories[0].DetailCategory.name}
                </div>
                <div className="team-name">
                  {data.name} | {data.location.split(' ')[2]}
                </div>
              </div>
              <ExclamationCircleTwoTone twoToneColor="#DFDFEC" />
            </GroupHeader>
            <section className="group-content">
              <img
                className="big-img"
                src={data.GroupImages && data.GroupImages[0].URL}
                alt={data.GroupImages && data.GroupImages[0].description}
              />
              <div className="group-content-header">
                <div>
                  <div className="group-content-item">
                    {data.ActiveCategories[0].DetailCategory.name}
                  </div>
                  <div className="group-content-item">
                    {data.name} | {data.location.split(' ')[2]}
                  </div>
                </div>
                <div className="like" onClick={clickHeart}>
                  {filledHeart ? <HeartFilled /> : <HeartOutlined />}
                </div>
              </div>
              <div className="group-content-item">
                <div className="subtitle">모임소개</div>
                <div className="team-info-textarea">{data.groupIntro}</div>
              </div>
              <div className="group-content-item">
                <div className="subtitle">필요 스킬</div>
                <div>{data.location}</div>
              </div>
              <div className="group-content-item">
                <div className="subtitle">활동 요일</div>
                <div>
                  {data.ActiveTimes.reduce((acc, time) => {
                    return acc + `${time.activeDay} `;
                  }, '')}
                </div>
              </div>
              <div className="group-content-item">
                <div className="subtitle">활동 시간</div>
                <div className="group-content-item-time">
                  <div className="group-content-item-time-div">
                    <div>시작 시간</div>
                    <div>{data.ActiveTimes[0].startTime}</div>
                  </div>
                  <div className="group-content-item-time-div">
                    <div>종료 시간</div>
                    <div>{data.ActiveTimes[0].endTime}</div>
                  </div>
                </div>
              </div>
              <div className="group-location">
                <div className="subtitle">모임 지역</div>
                <div>{data.location}</div>
              </div>
              <KakaoMap location={data.location} />
              <Divider />
              <div className="group-content-item">
                <div className="subtitle">모임 리뷰</div>
                <div>리뷰 컴포넌트 ~,~</div>
              </div>
              <Divider />
              <div className="group-content-item">
                <div className="subtitle">모임 Q&amp;A</div>
                <div>QnA 컴포넌트 ~,~</div>
              </div>
            </section>
            <Plus type="button" onClick={clickPlusButton}>
              <PlusOutlined />
            </Plus>
          </GroupContainer>
        </Modal>
      )}
      {isShowingSetting && (
        <Setting
          setIsShowingSetting={setIsShowingSetting}
          groupId={groupId}
          modify={modify}
          setModify={setModify}
        />
      )}
      {modify && <MakingGroup modify={modify} setCloseModal={setModify} />}
    </>
  );
};

export default GroupDetail;
