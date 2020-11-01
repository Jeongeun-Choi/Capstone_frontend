import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPreferGroupsRequestAction } from '../../reducers/user';
import styled from '@emotion/styled';
import GroupItem from './GroupItem';
import useCheckResult from '../../hooks/useCheckResult';

const GroupContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const GroupList = styled.ul`
  width: 100%;
  height: 35vh;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;

const LikeGroups = () => {
  const dispatch = useDispatch();
  const { id, preferGroups } = useSelector((state) => state.user.me);

  const [toggleIsShow, CheckScreen] = useCheckResult({
    title: '푸시알람 설정',
    content: '푸시 알람이 재설정 되었습니다.',
  });

  useEffect(() => {
    if (id) {
      dispatch(loadPreferGroupsRequestAction(id));
    }
  }, [id]);

  return (
    <GroupContainer>
      {preferGroups && preferGroups.recruitingGroups.length ? (
        <GroupList>
          {preferGroups.recruitingGroups.map((group, index) => (
            <GroupItem
              key={group.id}
              memberId={id}
              group={group}
              deadLine={preferGroups.recruitingGroupsDeadLine[index]}
              recruiting={true}
              toggleIsShow={toggleIsShow}
            />
          ))}
        </GroupList>
      ) : (
        <div>모집 중인 그룹이 없습니다.</div>
      )}

      {preferGroups && preferGroups.recruitedGroups.length ? (
        <GroupList>
          {preferGroups.recruitedGroups.map((group, index) => (
            <GroupItem
              key={group.id}
              memberId={id}
              group={group}
              deadLine={preferGroups.recruitedGroupsDeadLine[index]}
              recruiting={false}
              toggleIsShow={toggleIsShow}
            />
          ))}
        </GroupList>
      ) : (
        <div>모집 마감된 그룹이 없습니다.</div>
      )}
      <CheckScreen />
    </GroupContainer>
  );
};

export default LikeGroups;
