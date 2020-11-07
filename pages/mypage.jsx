import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { Tabs } from 'antd';
import MyProfile from '../components/mypage/MyProfile';
import LikeGroups from '../components/mypage/LikeGroups';
import { loadMyInfoRequestAction } from '../reducers/user';
import styled from '@emotion/styled';
import Header from '../components/main/Header';

const { TabPane } = Tabs;

const CustomTabs = styled(Tabs)`
  width: 100%;
  height: 90vh;
  overflow-y: auto;
  .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #aaabd3;
      font-weight: bold;
    }
  }
  .ant-tabs-tab {
    width: 50%;
    display: flex;
    justify-content: center;

    :hover {
      color: #aaabd3;
    }
  }

  & .ant-tabs-content {
    height: 100%;
  }

  & .ant-tabs-tab {
    margin-right: 0.1rem;
  }
  & .ant-tabs-nav {
    margin: 0;
  }
  .ant-tabs-ink-bar {
    background: #aaabd3;
  }
`;

const mypage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(loadMyInfoRequestAction());
  }, []);

  return (
    <>
      <Header
        type="white"
        title="마이페이지"
        moreButton={true}
        moreOnClick={() => router.push('/setting')}
      />
      <CustomTabs defaultActiveKey="1" centered>
        <TabPane tab="프로필" key="1">
          <MyProfile />
        </TabPane>
        <TabPane tab="좋아요" key="2">
          <LikeGroups />
        </TabPane>
      </CustomTabs>
    </>
  );
};

export default mypage;
