import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import styled from '@emotion/styled';
import Groups from '../components/group/Groups';
import EmptyGroups from '../components/group/EmptyGroups';
import Header from '../components/main/Header';
import {
  loadJoingroupsRequestAction,
  loadApplyGroupsRequestAction,
  loadMyInfoRequestAction,
  loadPreferGroupsRequestAction
} from '../reducers/user';

// #6055CD
const GroupContainer = styled.div`
  font-family: 'Nanum Gothic', sans-serif;
  width: 100%;
  .ant-tabs-nav-list {
    width: 100%;
  }
  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      color: #6055cd;
      font-weight: bold;
    }
  }
  .ant-tabs-tab {
    margin-right: 1px;
    width: 50%;
    display: flex;
    justify-content: center;

    :hover {
      color: #6055cd;
    }
  }
  .ant-tabs-ink-bar {
    background-color: #6055cd;
  }
`;
const group = () => {
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  const applyGroups = '내가 지원한 모임';
  const myGroups = '나의 모임';
  const { me } = useSelector(state => state.user);
  const { posts } = useSelector(state => state.post);
  const { groups } = useSelector(state => state.group);

  // useEffect(() => {
  //   dispatch(loadMyInfoRequestAction());
  // }, []);

  useEffect(() => {
    if (me.id) {
      dispatch(loadJoingroupsRequestAction({ id: me.id }));
      dispatch(loadApplyGroupsRequestAction({ id: me.id }));
      dispatch(loadPreferGroupsRequestAction(me.id));
    }
  }, [posts, groups]);

  return (
    <GroupContainer>
      <Header type="white" title="모임" />
      <Tabs defaultActiveKey="1">
        <TabPane tab={applyGroups} key="1">
          {me?.ApplyGroups?.length !== 0 ? (
            <Groups groups={me.ApplyGroups} type="group" />
          ) : (
            <EmptyGroups pageTab={applyGroups} />
          )}
        </TabPane>
        <TabPane tab={myGroups} key="2">
          {me?.JoinGroups?.length !== 0 ? (
            <Groups groups={me.JoinGroups} type="group" />
          ) : (
            <EmptyGroups pageTab={myGroups} />
          )}
        </TabPane>
      </Tabs>
    </GroupContainer>
  );
};

export default group;
