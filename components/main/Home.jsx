import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { loadGroupsRequestAction } from '../../reducers/group';
import GroupList from './GroupList';
import styled from '@emotion/styled';
import { loadMyInfoRequestAction } from '../../reducers/user';

const HomeContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const RecommendText = styled.section`
  padding: 3rem 0 2rem 0;
  margin: 0 auto;
  text-align: center;
`;

const NoRecommandation = styled.section`
  padding: 3rem 0;
  margin: 0 auto;
  text-align: center;
`;
const Home = () => {
  const dispatch = useDispatch();
  const { groups, groupsLoading } = useSelector(state => state.group);
  const { me } = useSelector(state => state.user);
  const containerRef = useRef(null);
  const filteredGroups = useMemo(() => {
    if (
      !me.id ||
      !groups ||
      !groups.length ||
      !me?.PreferCategories ||
      !me?.PreferLocations
    )
      return groups;

    return groups.filter(group => {
      // me.PreferLocations 의 address , me.PreferCategories 배열의 DetailCategory의 id
      if (group?.ActiveCategories?.length) {
        const result = group.ActiveCategories.some(({ detilCategoryId }) =>
          me.PreferCategories.some(
            ({ DetailCategory }) => DetailCategory.id === detilCategoryId
          )
        );
        if (result) return true;
      }

      if (group.location && me.PreferLocations.length) {
        const result = me.PreferLocations.some(
          ({ address }) =>
            address
              .split(' ')
              .slice(0, 2)
              .join(' ') ===
            group.location
              .split(' ')
              .slice(0, 2)
              .join(' ')
        );
        if (result) return true;
      }

      return false;
    });
  }, [me, groups]);

  useEffect(() => {
    dispatch(loadGroupsRequestAction());
  }, []);

  return (
    <HomeContainer ref={containerRef}>
      {me.id && (
        <RecommendText>
          선호 지역 및 카테고리를 기반으로
          <br />
          <b>{me.name}</b>님에게 추천하는 모임을 확인해보세요! 😎
        </RecommendText>
      )}
      {groupsLoading && (
        <LoadingOutlined style={{ fontSize: '3rem', margin: 'auto' }} />
      )}
      {filteredGroups.length ? (
        <GroupList groups={filteredGroups} />
      ) : (
        <NoRecommandation>
          선호 지역 및 카테고리를 기반으로
          <br />
          <b>{me.name}</b>님에게 추천할 수 있는 모임이 없습니다.😅
          <br />
          다른 지역 또는 카테고리를 선택해보세요.
        </NoRecommandation>
      )}
    </HomeContainer>
  );
};

export default Home;
