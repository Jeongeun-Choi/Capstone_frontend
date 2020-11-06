import React from 'react';
import { useSelector } from 'react-redux';
import MyInfo from './MyInfo';
import PreferCategory from './PreferCategory';
import PreferLocation from './PreferLocation';

import { Tabs, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const { TabPane } = Tabs;

const ProfileSection = styled.section`
  width: 100%;
  height: 100%;
  background: #F6F6F6;
  padding-top: 2rem;
  font-family: 'Nanum Gothic', sans-serif;


  & .profile_intro {
    width: 90%;
    padding: 2rem;
    margin: 0 auto;
    background: #6055CD;
    border-radius: 10px;
  }

  & .ant-tabs-nav-list {
    width: 100%;
    color: #6055CD;
    background: #F6F6F6;
  }

  & .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab,
  & .ant-tabs-card > div > .ant-tabs-nav .ant-tabs-tab {
    background: #F6F6F6;
    border: none;
  }

  & .ant-tabs {
    min-height: 100%;
  }

  & .ant-tabs-tab {
    height: 3rem;
  }

  & .ant-tabs-tab:hover {
    /* opacity: 0.6; */
    font-weight: extrabold;
  }

  & .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      //color: white;
      color: #6055CD;
      font-weight: bold;
    }
  }

  & .ant-tabs-content-holder {
    padding: 2rem;
    height: 100%;
    background: white;
  }

  & .profile_intro {
    color: white;
    & > span {
      font-weight: bold;
      margin-left: 1rem;
    }
  }
`;
const MyProfile = () => {
  const myInfo = useSelector((state) => state.user.me);

  return (
    <ProfileSection>
      <div className='profile_intro'>
        {myInfo.profileImg ? (
          <Avatar size='large' src={myInfo.profileImg}></Avatar>
        ) : (
          <Avatar size='large' icon={<UserOutlined />}></Avatar>
        )}
        <span>{myInfo.name}</span>님 안녕하세요
      </div>
      <Tabs defaultActiveKey='1' centered type='card'>
        <TabPane tab='개인정보설정' key='1'>
          <MyInfo myInfo={myInfo} />
        </TabPane>
        <TabPane tab='관심분야설정' key='2'>
          <PreferCategory myInfo={myInfo} />
        </TabPane>
        <TabPane tab='활동지역설정' key='3'>
          <PreferLocation myInfo={myInfo} />
        </TabPane>
      </Tabs>
    </ProfileSection>
  );
};

export default MyProfile;
