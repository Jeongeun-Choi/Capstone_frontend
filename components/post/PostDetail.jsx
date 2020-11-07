import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { ModalHeader, modalFooter, Modal } from '../../public/style';
import { LeftOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';
import JoinTeam from './JoinTeam';
import { Divider } from 'antd';
import customAxios from '../../utils/baseAxios';
import GroupDetail from './GroupDetail';

const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Nanum Gothic', sans-serif;

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
  background-color: #6055CD;

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
  background-color: #6055CD;
  border: 1px solid #6055CD;
  font-weight: bold;
`;
const PostDetail = ({ recruitId, setIsShowing }) => {
  const [data, setData] = useState(null);
  const [showingJoinModal, setShowingJoinModal] = useState(false);
  const [showingGroupDetail, setShowingGroupDetail] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = useCallback(async () => {
    const { data } = await customAxios.get(`/recruits/${recruitId}`);
    setData(data.recruit);
  }, [recruitId]);

  const clickJoinButton = useCallback(() => {}, []);

  const clickGroupDetail = useCallback(() => {
    setShowingGroupDetail(prev => !prev);
  }, []);

  const closeModal = useCallback(() => {
    setIsShowing(prev => !prev);
  }, []);

  return (
    <>
      {data && (
        <Modal>
          <PostContainer>
            <PostHeader>
              <LeftOutlined onClick={closeModal} />
              <h3>{data.title}</h3>
              <ExclamationCircleTwoTone twoToneColor="#DFDFEC" />
            </PostHeader>
            <main className="post-content">
              <div className="post-item">
                <div className="subtitle">내용</div>
                <div>{data.contents}</div>
              </div>
              <div className="post-item">
                <div className="subtitle">마감 시간</div>
                <div>{data.deadline}</div>
              </div>
              <div className="post-item">
                <div className="subtitle">예상 인원</div>
                {data.expectMemberCount}명
              </div>
              <Divider />
              <div className="group-page" onClick={clickGroupDetail}>
                <img
                  className="small-img"
                  src={
                    data.JoinGroup.Group.GroupImages.length
                      ? data.JoinGroup.Group.GroupImages[0].URL
                      : '/images/teamimg.jpg'
                  }
                  alt={
                    data.JoinGroup.Group.GroupImages.length
                      ? data.JoinGroup.Group.GroupImages[0].description
                      : '기본 이미지'
                  }
                />
                <div className="group-page-info">
                  <div>
                    {
                      data.JoinGroup.Group.ActiveCategories[0].DetailCategory
                        .name
                    }
                  </div>
                  <div>{data.JoinGroup.Group.name}</div>
                  <div>since 2019</div>
                </div>
              </div>
            </main>
          </PostContainer>
          <Footer type="button" onClick={clickJoinButton}>
            이 모임에 참여하기
          </Footer>
        </Modal>
      )}
      {showingJoinModal && (
        <JoinTeam
          category={
            data.JoinGroup.Group.ActiveCategories[0].DetailCategory.name
          }
          groupName={data.JoinGroup.Group.name}
          setShowingJoinModal={setShowingJoinModal}
          groupId={data.JoinGroup.Group.id}
        />
      )}
      {showingGroupDetail && (
        <GroupDetail
          groupId={data.JoinGroup.Group.id}
          setIsShowing={setShowingGroupDetail}
        />
      )}
    </>
  );
};

export default PostDetail;
