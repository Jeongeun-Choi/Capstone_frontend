import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ModalHeader, modalFooter, Modal } from '../../public/style';
import { LeftOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import JoinTeam from '../../components/post/JoinTeam';
import { Divider } from 'antd';
import customAxios from '../../utils/baseAxios';

const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .post-content {
    display: flex;
    flex-direction: column;
    width: 90%;

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

    & .group-page {
      display: flex;
      width: 90%;
      margin-top: 25px;
      height: 90px;

      & .small-img {
        width: 45%;
        min-width: 160px;
        height: 90px;
      }

      & .group-page-info {
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

const PostHeader = styled(ModalHeader)`
  background-color: #6055cd;

  h3 {
    color: #ffffff;
  }
  & .anticon-exclamation-circle {
    position: absolute;
    top: 25px;
    right: 20px;
    font-size: 25px;
  }
`;

const Footer = styled.button`
  ${modalFooter}
  color: #ffffff;
  background-color: #6055cd;
  border: 1px solid #6055cd;
  font-weight: bold;
`;
const PostDetail = () => {
  const router = useRouter();
  const [selectedRecruit, setSelectedRecruit] = useState({});
  const [showingJoinModal, setShowingJoinModal] = useState(false);
  const { id } = router.query;
  const {
    title,
    contents,
    deadline,
    expectMemberCount,
    JoinGroup
  } = selectedRecruit;

  const getData = useCallback(async () => {
    try {
      const { data } = await customAxios.get(`/recruits/${id}`);
      setSelectedRecruit(data.recruit);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  const clickJoinButton = useCallback(() => {
    setShowingJoinModal(prev => !prev);
  }, []);

  const backRoute = useCallback(() => {
    router.back();
  }, []);

  const moveDetailInfo = useCallback(() => {
    router.push(`/group/${JoinGroup?.Group?.id}`);
  }, [selectedRecruit]);

  return (
    <>
      <PostContainer>
        <PostHeader>
          <LeftOutlined onClick={backRoute} />
          <h3>{title}</h3>
          <ExclamationCircleTwoTone twoToneColor="#DFDFEC" />
        </PostHeader>
        <main className="post-content">
          <div className="post-item">
            <div className="subtitle">내용</div>
            <div>{contents}</div>
          </div>
          <div className="post-item">
            <div className="subtitle">마감 시간</div>
            <div>{deadline}</div>
          </div>
          <div className="post-item">
            <div className="subtitle">예상 인원</div>
            {expectMemberCount}명
          </div>
          <Divider />
          <div className="group-page" onClick={moveDetailInfo}>
            <img
              className="small-img"
              src={
                selectedRecruit && JoinGroup?.Group?.GroupImages?.length
                  ? JoinGroup.Group.GroupImages[0].URL
                  : '/images/teamimg.jpg'
              }
              alt={
                selectedRecruit && JoinGroup?.Group?.GroupImages?.length
                  ? JoinGroup.Group.GroupImages[0].description
                  : '기본 이미지'
              }
            />
            <div className="group-page-info">
              <div>
                {selectedRecruit &&
                  JoinGroup?.Group?.ActiveCategories?.length &&
                  JoinGroup.Group.ActiveCategories[0].DetailCategory.name}
              </div>
              <div>{JoinGroup?.Group && JoinGroup.Group.name}</div>
              <div>since 2019</div>
            </div>
          </div>
        </main>
      </PostContainer>
      <Footer type="button" onClick={clickJoinButton}>
        이 모임에 참여하기
      </Footer>
      {showingJoinModal && (
        <JoinTeam
          category={
            JoinGroup?.Group?.ActiveCategories.length &&
            JoinGroup.Group.ActiveCategories[0].DetailCategory.name
          }
          groupName={JoinGroup?.Group && JoinGroup.Group.name}
          setShowingJoinModal={setShowingJoinModal}
          groupId={JoinGroup?.Group && JoinGroup.Group.id}
        />
      )}
    </>
  );
};

export default PostDetail;
