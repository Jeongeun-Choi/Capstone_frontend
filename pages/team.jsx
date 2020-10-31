import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import styled from '@emotion/styled';
import Teams from '../components/team/Teams';
import EmptyTeams from '../components/team/EmptyTeams';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadJoingroupsRequestAction,
  loadApplyGroupsRequestAction
} from '../reducers/user';

// #AAABD3
const TeamContainer = styled.div`
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
const team = () => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  const applyTeams = '내가 지원한 모임';
  const myTeams = '나의 모임';

  useEffect(() => {
    me.id &&
      dispatch(loadJoingroupsRequestAction(me.id)) &&
      dispatch(loadApplyGroupsRequestAction(me.id));
  }, []);

  return (
    <TeamContainer>
      <Tabs defaultActiveKey="1">
        <TabPane tab={applyTeams} key="1">
          {me.applyGroups ? (
            <Teams tab={myTeams} groups={me.applyGroups} />
          ) : (
            <EmptyTeams pageTab={applyTeams} />
          )}
        </TabPane>
        <TabPane tab={myTeams} key="2">
          {me.joinGroups ? (
            <Teams tab={myTeams} groups={me.joinGroups} />
          ) : (
            <EmptyTeams pageTab={myTeams} />
          )}
        </TabPane>
      </Tabs>
    </TeamContainer>
  );
};

export default team;
