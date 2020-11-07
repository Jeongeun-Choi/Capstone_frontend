import React from 'react';
import styled from '@emotion/styled';
import EmptyGroups from '../components/team/EmptyGroups';
import Groups from '../components/team/Groups';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import Header from '../components/main/Header';

const GroupContainer = styled.div`
  width: 100%;
  font-family: 'Nanum Gothic', sans-serif;
  .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color:#6055CD;
      font-weight: bold;
    }
  }
  .ant-tabs-tab {
    width: 50%;
    display: flex;
    justify-content: center;

    :hover {
      color:#6055CD;
    }
  }
  .ant-tabs-ink-bar {
    background-color: #6055CD;
  }
`;

const writing = () => {
  const { TabPane } = Tabs;
  const myPosts = '나의 모집글';
  const myGroups = '나의 모임';
  const { me } = useSelector(state => state.user);

  return (
    <GroupContainer>
      <Header
        type="white"
        backButton={false}
        declareButton={false}
        closeButton={false}
        title="모집글 등록"
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab={myGroups} key="1">
          {me.joinGroups.length !== 0 ? (
            <Groups groups={me.joinGroups} type="post" />
          ) : (
            <EmptyGroups pageTab={myGroups} />
          )}
        </TabPane>
        <TabPane tab={myPosts} key="2">
          {me.recruits.length ? (
            <Groups groups={me.recruits} type="postEdit" />
          ) : (
            <EmptyGroups pageTab={myPosts} />
          )}
        </TabPane>
      </Tabs>
    </GroupContainer>
  );
};

export default writing;
