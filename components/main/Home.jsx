import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { loadGroupsRequestAction } from '../../reducers/group';
import GroupList from './GroupList';
import styled from '@emotion/styled';

const HomeContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RecommendText = styled.section`
  padding: 2rem 0;
  margin: 0 auto;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { groups, groupsLoading } = useSelector((state) => state.group);
  const { me } = useSelector((state) => state.user);
  const containerRef = useRef(null);
  useEffect(() => {
    dispatch(loadGroupsRequestAction());
  }, []);

  return (
    <HomeContainer ref={containerRef}>
      {me.id && (
        <RecommendText>
          "<b>{me.name}</b>에게 추천하는 모임을 확인해보세요!"
        </RecommendText>
      )}
      {groupsLoading && (
        <LoadingOutlined style={{ fontSize: '3rem', margin: 'auto' }} />
      )}
      <GroupList groups={groups} />
    </HomeContainer>
  );
};

export default Home;
