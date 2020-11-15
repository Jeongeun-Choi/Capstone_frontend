import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPreferGroupsRequestAction } from '../../reducers/user';
import styled from '@emotion/styled';
import GroupItem from './GroupItem';
import useCheckResult from '../../hooks/useCheckResult';

const GroupContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;

  & .liked-group-division{
    text-align: center;
    font-size: 1rem;
    margin: auto 0;
  }
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
  const { id, PreferGroups } = useSelector((state) => state.user.me);

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
      {PreferGroups && PreferGroups.recruitingGroups?.length ? (
        <GroupList>
          {PreferGroups.recruitingGroups.map((group, index) => (
            <GroupItem
              key={group.id}
              memberId={id}
              group={group}
              deadLine={PreferGroups.recruitingGroupsDeadLine[index]}
              recruiting={true}
              toggleIsShow={toggleIsShow}
            />
          ))}
        </GroupList>
      ) : (
        <div className="liked-group-division"><b>모집 중</b>인 그룹이 없습니다.</div>
      )}

      {PreferGroups && PreferGroups.recruitedGroups?.length ? (
        <GroupList>
          {PreferGroups.recruitedGroups.map((group, index) => (
            <GroupItem
              key={group.id}
              memberId={id}
              group={group}
              deadLine={PreferGroups.recruitedGroupsDeadLine[index]}
              recruiting={false}
              toggleIsShow={toggleIsShow}
            />
          ))}
        </GroupList>
      ) : (
        <div className="liked-group-division">모집이 <b>마감</b>된 그룹이 없습니다.</div>
      )}
      <CheckScreen />
    </GroupContainer>
  );
};

export default LikeGroups;
