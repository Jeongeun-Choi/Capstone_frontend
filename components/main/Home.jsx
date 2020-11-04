import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { loadGroupsRequestAction } from '../../reducers/group';
import GroupList from './GroupList';
import styled from '@emotion/styled';

const HomeContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
`;

const Home = () => {
  const dispatch = useDispatch();
  const { groups, groupsLoading } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(loadGroupsRequestAction());
  }, []);
  return (
    <HomeContainer>
      {groupsLoading && (
        <LoadingOutlined style={{ fontSize: '3rem', margin: 'auto' }} />
      )}
      <GroupList groups={groups} />
    </HomeContainer>
  );
};

export default Home;
