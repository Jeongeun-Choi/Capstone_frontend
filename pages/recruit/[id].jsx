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
    //border: 1px solid green;

    & .big-img {
      margin-top: 20px;
      width: 100%;
      height: 30vh;
    }


    & .post-item{
      margin-top: 0.9rem;
      //border: 1px solid red;
      & .subtitle{
        font-weight: bold;
      }
    }

    & .ant-divider {
      border-top: 1px solid #5f5f5f;
    }
  }

  & .click-group-page{
    text-align: center;
    //border: 1px solid orange;
    
  }

  & .group-page {
    display: flex;
    width: 90%;
    margin-top: 25px;
    height: 90px;
    background-color: #F6F6F6;
    border-radius: 10px;
    margin-left: 1rem; 
    //border: 1px solid violet;

    & .small-img {
      margin-left: 0.3rem;
      margin-top: 0.3rem;
      border-radius: 10px;
      width: 45%;
      min-width: 150px;
      height: 80px;
    }

    & .group-page-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 0.6rem;
    }
  }
`;

const PostHeader = styled(ModalHeader)`
  background-color: white;

  h3 {
    color: black;
    white-space: nowrap; 
    width: 50%;
    overflow:hidden;
    text-overflow: ellipsis;
    text-align: center;
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
          <ExclamationCircleTwoTone twoToneColor="#C4C4C4" />
        </PostHeader>
        <main className="post-content">
          <div className="post-item">
            <div className="subtitle">✦ 내용</div>
            <div>{contents}</div>
          </div>
          <div className="post-item">
            <div className="subtitle">✦ 마감 시간</div>
            <div>{deadline}</div>
          </div>
          <div className="post-item">
            <div className="subtitle">✦ 예상 인원</div>
            {expectMemberCount}명
          </div>
          <Divider />
          <div className="click-group-page">
            "모임을 <b>클릭</b>하여 <b>모임 상세 정보</b>를 확인해보세요!"
          </div>
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
              <div>
                <b>{JoinGroup?.Group && JoinGroup.Group.name}</b>
              </div>
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
