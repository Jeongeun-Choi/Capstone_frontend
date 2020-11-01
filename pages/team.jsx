import React from 'react';
import { Tabs } from 'antd';
import styled from '@emotion/styled';
import Teams from '../components/team/Teams';
import EmptyTeams from '../components/team/EmptyTeams';

// #AAABD3
const TeamContainer = styled.div`
  width: 100%;
  .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      //color: #aaabd3;
      color: #6055CD;
      font-weight: bold;
    }
  }
  .ant-tabs-tab {
    width: 50%;
    display: flex;
    justify-content: center;

    :hover {
      //color: #aaabd3;
      color: #6055CD;
    }
  }
  .ant-tabs-ink-bar {
    //border-bottom: 4px solid #aaabd3;
    border-bottom: 4px solid #6055CD;
  }
`;

const team = () => {
  const { TabPane } = Tabs;
  const applyTeams = '내가 지원한 모임';
  const myTeams = '나의 모임';

  return (
    <TeamContainer>
      <Tabs defaultActiveKey="1">
        <TabPane tab={applyTeams} key="1">
          <Teams tab={applyTeams} />
        </TabPane>
        <TabPane tab={myTeams} key="2">
          <EmptyTeams pageTab={myTeams} />
        </TabPane>
      </Tabs>
    </TeamContainer>
  );
};

export default team;
