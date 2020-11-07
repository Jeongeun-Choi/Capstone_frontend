import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import styled from '@emotion/styled';
import Groups from '../components/team/Groups';
import EmptyGroups from '../components/team/EmptyGroups';
import Header from '../components/main/Header';

// #6055CD
const GroupContainer = styled.div`
  font-family: 'Nanum Gothic', sans-serif;
  width: 100%;
  .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #6055CD;
      font-weight: bold;
    }
  }
  .ant-tabs-tab {
    width: 50%;
    display: flex;
    justify-content: center;

    :hover {
      color: #6055CD;
    }
  }
  .ant-tabs-ink-bar {
    background-color: #6055CD;
  }
`;
const group = () => {
  const { TabPane } = Tabs;
  const applyGroups = '내가 지원한 모임';
  const myGroups = '나의 모임';
  const { me } = useSelector(state => state.user);

  return (
    <GroupContainer>
      <Header type="white" title="모임명" />
      <Tabs defaultActiveKey="1">
        <TabPane tab={applyGroups} key="1">
          {me.applyGroups.length !== 0 ? (
            <Groups groups={me.applyGroups} type="group" />
          ) : (
            <EmptyGroups pageTab={applyGroups} />
          )}
        </TabPane>
        <TabPane tab={myGroups} key="2">
          {me.joinGroups.length !== 0 ? (
            <Groups groups={me.joinGroups} type="group" />
          ) : (
            <EmptyGroups pageTab={myGroups} />
          )}
        </TabPane>
      </Tabs>
    </GroupContainer>
  );
};

export default group;
