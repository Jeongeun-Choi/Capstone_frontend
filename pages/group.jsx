import React from 'react';
import { useSelector } from 'react-redux';
import { Tabs } from 'antd';
import styled from '@emotion/styled';
import Groups from '../components/team/Groups';
import EmptyTeams from '../components/team/EmptyTeams';

// #AAABD3
const GroupContainer = styled.div`
  width: 100%;
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
  .ant-tabs-ink-bar {
    /* border-bottom: 4px solid #aaabd3; */
    background-color: #aaabd3;
  }
`;
const group = () => {
  const { TabPane } = Tabs;
  const applyGroups = '내가 지원한 모임';
  const myGroups = '나의 모임';
  const { me } = useSelector(state => state.user);

  return (
    <GroupContainer>
      <Tabs defaultActiveKey="1">
        <TabPane tab={applyGroups} key="1">
          {me.applyGroups ? (
            <Groups tab={myGroups} groups={me.applyGroups} type="group" />
          ) : (
            <EmptyTeams pageTab={applyGroups} />
          )}
        </TabPane>
        <TabPane tab={myGroups} key="2">
          {me.joinGroups ? (
            <Groups tab={myGroups} groups={me.joinGroups} type="group" />
          ) : (
            <EmptyTeams pageTab={myGroups} />
          )}
        </TabPane>
      </Tabs>
    </GroupContainer>
  );
};

export default group;
