import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/main/Header';
import customAxios from '../../utils/baseAxios';
import styled from '@emotion/styled';
import { HeartFilled, HeartOutlined, PlusOutlined } from '@ant-design/icons';
import KakaoMap from '../../components/map/KakaoMap';
import { Divider } from 'antd';
import Setting from '../../components/team/groupSetting/Setting';
import MakingGroup from '../../components/team/MakingGroup';

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

      & > div {
        width: 90%;
      }
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
      display: flex;
      width: 90%;
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

const GroupDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedGroup, setSelectedGroup] = useState({});

  const {
    name,
    ActiveCategories,
    GroupImages,
    ActiveTimes,
    Skills,
    groupIntro,
    location
  } = selectedGroup;

  console.log(selectedGroup);
  const [filledHeart, setFilledHeart] = useState(false);
  const [isShowingSetting, setIsShowingSetting] = useState(false);
  const [modify, setModify] = useState(false);

  const clickHeart = useCallback(() => {
    setFilledHeart(prev => !prev);
  }, []);

  const clickPlusButton = useCallback(() => {
    setIsShowingSetting(prev => !prev);
  }, []);

  const getGroupData = async () => {
    try {
      const { data } = await customAxios.get(`/groups/${id}`);
      setSelectedGroup(data.group);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroupData();
  }, [id]);

  return (
    <>
      <GroupContainer>
        <Header
          title={name}
          subtitle={ActiveCategories && ActiveCategories[0].DetailCategory.name}
          backButton={true}
          type="purple"
          declareButton={true}
        />
        <section className="group-content">
          <img
            className="big-img"
            src={GroupImages && GroupImages[0].URL}
            alt={GroupImages && GroupImages[0].description}
          />
          <div className="group-content-header">
            <div>
              <div className="group-content-item">
                {!!ActiveCategories && ActiveCategories[0]?.DetailCategory.name}
              </div>
              <div className="group-content-item">
                {name} | {location?.split(' ')[2]}
              </div>
            </div>
            <div className="like" onClick={clickHeart}>
              {filledHeart ? <HeartFilled /> : <HeartOutlined />}
            </div>
          </div>
          <div className="group-content-item">
            <div className="subtitle">모임소개</div>
            <div className="team-info-textarea">{groupIntro}</div>
          </div>
          <div className="group-content-item">
            <div className="subtitle">필요 스킬</div>
            <div>
              {Skills &&
                Skills.reduce((total, skill) => {
                  return total + `${skill.name} `;
                }, '')}
            </div>
          </div>
          <div className="group-content-item">
            <div className="subtitle">활동 요일</div>
            <div>
              {ActiveTimes?.reduce((acc, time) => {
                return acc + `${time.activeDay}, `;
              }, '')}
            </div>
          </div>
          <div className="group-content-item">
            <div className="subtitle">활동 시간</div>
            <div className="group-content-item-time">
              <div className="group-content-item-time-div">
                <div>시작 시간</div>
                <div>{ActiveTimes?.length && ActiveTimes[0].startTime}</div>
              </div>
              <div className="group-content-item-time-div">
                <div>종료 시간</div>
                <div>{ActiveTimes?.length && ActiveTimes[0].endTime}</div>
              </div>
            </div>
          </div>
          <div className="group-location">
            <div className="subtitle">모임 지역</div>
            <div>{location}</div>
          </div>
          {location && <KakaoMap location={location} />}
          <div className="team-page">
            <img
              className="small-img"
              src={GroupImages?.length && GroupImages[0].URL}
              alt={GroupImages?.length && GroupImages[0].description}
            />
            <div className="team-page-info">
              <div>
                {ActiveCategories?.length &&
                  ActiveCategories[0]?.DetailCategory.name}
              </div>
              <div>{name}</div>
              <div>since 2019</div>
            </div>
          </div>
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
      {isShowingSetting && (
        <Setting
          setIsShowingSetting={setIsShowingSetting}
          setModify={setModify}
        />
      )}
      {modify && (
        <MakingGroup
          groupId={id}
          modify={modify}
          setCloseModal={setModify}
          data={selectedGroup}
        />
      )}
    </>
  );
};

export default GroupDetail;