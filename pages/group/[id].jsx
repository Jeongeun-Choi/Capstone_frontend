import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Header from '../../components/main/Header';
import customAxios from '../../utils/baseAxios';
import styled from '@emotion/styled';
import { HeartFilled, HeartOutlined, PlusOutlined } from '@ant-design/icons';
import KakaoMap from '../../components/map/KakaoMap';
import { Divider, message } from 'antd';
import Setting from '../../components/group/groupSetting/Setting';
import MakingGroup from '../../components/group/MakingGroup';
import Review from '../../components/review/Review';
import ReviewWriting from '../../components/review/ReviewWriting';
import Qna from '../../components/post/Qna';
import { loadPreferGroupsRequestAction } from '../../reducers/user';

const GroupContainer = styled.div`
  width: 100%;
  & .post-info {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .group-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: auto;

    & .big-img {
      width: 100%;
      height: 30vh;
      margin-top: 0.5rem;
    }

    & .group-content-header {
      width: 100%;
      height: 6%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.5rem 0 0.5rem 0;
      background: #f6f6f6;

      & .group-basic-info {
        width: 90%;
        //border: 1px solid red;
        margin-left: 1rem;

        & .group-basic-category {
          font-size: 0.8rem;
          color: black;
          //border: 1px solid green;
        }

        & .group-basic-name {
          font-size: 1rem;
          color: black;
          //border: 1px solid blue;
        }
      }
      & .like {
        display: flex;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-color: #f6f6f6;
        //border: 1px solid orange;
        margin-right: 1rem;

        & .anticon-heart {
          margin: auto;
          font-size: 16px;
          color: #eb5757;
        }
      }
    }

    & .group-content-item {
      width: 90%;
      margin-top: 0.9rem;
      margin-bottom: 0.6rem;
      //border: 1px solid green;

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
      //border: 1px solid pink;
      margin-top: 1.5rem;
    }

    & .subtitle {
      font-weight: bold;
      font-size: 15px;
      margin-right: 10px;
      //border: 1px solid blue;
    }
    & .team-page {
      display: flex;
      width: 90%;
      margin-top: 25px;
      height: 90px;
      background-color: #f6f6f6;
      border-radius: 10px;
      //border: 1px solid purple;

      & .small-img {
        margin-left: 0.3rem;
        margin-top: 0.3rem;
        border-radius: 10px;
        width: 45%;
        min-width: 150px;
        height: 80px;
      }

      & .team-page-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 0.6rem;
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
  left: 82.5%;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid #6055cd;
  background-color: #6055cd;
  box-shadow: 3px 3px 3px grey;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 3;
`;

const GroupDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const [selectedGroup, setSelectedGroup] = useState({});
  const [showPlusButton, setShowPlusButton] = useState(false);
  const isMyGroup = useMemo(() => {
    if (!me?.id || !selectedGroup?.JoinGroups?.length) return false;
    return me.id === selectedGroup.JoinGroups[0].memberId;
  }, [me, selectedGroup]);

  const {
    name,
    ActiveCategories,
    GroupImages,
    ActiveTimes,
    Skills,
    groupIntro,
    location
  } = selectedGroup;

  const [filledHeart, setFilledHeart] = useState(false);
  const [isShowingSetting, setIsShowingSetting] = useState(false);
  const [modify, setModify] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviews, setReviews] = useState([]);

  const clickHeart = useCallback(async () => {
    if (!me.id) {
      return message.error('로그인을 해야 합니다.');
    }
    if (!filledHeart) {
      await customAxios.post(`/prefer-group`, { memberId: me.id, groupId: id });
    } else {
      await customAxios.delete(`/prefer-group?memberId=${me.id}&groupId=${id}`);
    }
    setFilledHeart(prev => !prev);
  }, [filledHeart]);

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

  const getReviews = async () => {
    const { data } = await customAxios.get(
      `/evaluation?evaluatedGroupId=${id}`
    );
    setReviews(data.evaluates);
  };

  useEffect(() => {
    dispatch(loadPreferGroupsRequestAction(me.id));
    getReviews();
  }, [id, me.id]);

  useEffect(() => {
    getGroupData();
  }, []);

  useEffect(() => {
    if (!me.id) return;
    if (me.PreferGroups) {
      const { recruitingGroups, recruitedGroups } = me.PreferGroups;
      const isPrefer =
        (recruitingGroups?.length
          ? recruitingGroups.some(group => group.id === parseInt(id, 10))
          : false) ||
        (recruitedGroups?.length
          ? recruitedGroups.some(group => group.id === parseInt(id, 10))
          : false);
      isPrefer && setFilledHeart(true);
    }
  }, [me]);

  useEffect(() => {
    if (!me) {
      setShowPlusButton(false);
    }
    const filterGroups = me?.JoinGroups?.filter(
      group => group.Group.id === parseInt(id)
    );
    const isMine = filterGroups?.length ? true : false;
    setShowPlusButton(isMine);
  }, [id, me.JoinGroups, showPlusButton]);

  return (
    <>
      <GroupContainer>
        <Header
          title={name}
          subTitle={
            ActiveCategories?.length
              ? ActiveCategories[0]?.DetailCategory.name
              : ''
          }
          backButton={true}
          type="white"
        />
        <section className="group-content">
          <img
            className="big-img"
            src={
              GroupImages?.length ? GroupImages[0].URL : `/images/basicImg.png`
            }
            alt={
              GroupImages?.length ? GroupImages[0].description : `기본 이미지`
            }
          />

          <div className="group-content-header">
            <div className="group-basic-info">
              <div className="group-basic-category">
                {ActiveCategories?.length
                  ? ActiveCategories[0]?.DetailCategory?.name
                  : ''}
              </div>
              <div className="group-basic-name">
                <b>
                  {selectedGroup?.name} | {location?.split(' ')[2]}
                </b>
              </div>
            </div>
            <div className="like" onClick={clickHeart}>
              {filledHeart ? <HeartFilled /> : <HeartOutlined />}
            </div>
          </div>

          <div className="group-content-item">
            <div className="subtitle">✦ 모임소개</div>
            <div className="team-info-textarea">
              {selectedGroup && groupIntro}
            </div>
          </div>

          <div className="group-content-item">
            <div className="subtitle">✦ 필요한 스킬</div>
            {Skills &&
              Skills.reduce((total, skill) => {
                return total + `${skill.name} `;
              }, '')}
          </div>
          <div className="group-content-item">
            <div className="subtitle">✦ 활동 요일</div>
            <div>
              {ActiveTimes?.reduce((acc, time) => {
                return acc + `${time.activeDay}, `;
              }, '')}
            </div>
          </div>
          <div className="group-content-item">
            <div className="subtitle">✦ 활동 시간</div>
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
            <div className="subtitle">✦ 모임 지역</div>
            <div>{location}</div>
          </div>
          {location && <KakaoMap location={location} />}
          <div className="team-page">
            <img
              className="small-img"
              src={
                GroupImages?.length
                  ? GroupImages[0].URL
                  : `/images/basicImg.png`
              }
              alt={
                GroupImages?.length ? GroupImages[0].description : '기본 이미지'
              }
            />
            <div className="team-page-info">
              <div>
                {ActiveCategories?.length &&
                  ActiveCategories[0]?.DetailCategory?.name}
              </div>
              <div>
                <b>{selectedGroup?.name}</b>
              </div>
              <div>since 2019</div>
            </div>
          </div>
          <Divider />
          <div className="group-content-item">
            <div className="subtitle">✦ 모임 리뷰</div>
            <Review reviews={reviews} />
          </div>
          <Divider />
          <div className="group-content-item">
            <div className="subtitle">✦ 모임 Q&amp;A</div>
            <Qna groupId={id} isMyGroup={isMyGroup} />
          </div>
        </section>
        {showPlusButton && (
          <Plus type="button" onClick={clickPlusButton}>
            <PlusOutlined />
          </Plus>
        )}
      </GroupContainer>
      {isShowingSetting && (
        <Setting
          setIsShowingSetting={setIsShowingSetting}
          setModify={setModify}
          setShowReview={setShowReview}
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
      {showReview && (
        <ReviewWriting id={id} type="group" setCloseModal={setShowReview} />
      )}
    </>
  );
};

export default GroupDetail;
