import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { basicTeamStyle } from '../../public/style';
import customAxios from '../../utils/baseAxios';
import GroupDetail from '../post/GroupDetail';

const positions = {
  L: '모임장',
  n: '팀원'
};

const MyTeam = styled.li`
  width: 95%;
  height: 52px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 11px;

  .team-image {
    ${basicTeamStyle}
    width: 20%;
    min-width: 74.74px;
  }
  .team-info {
    ${basicTeamStyle}
    width: 60%;
    min-width: 247.44px;
    display: flex;
    flex-direction: column;
    font-size: 11px;
  }
`;

const Team = ({ groupId, groupName, position }) => {
  const [groupData, setGroupData] = useState(null);
  const [isShowing, setIsShowing] = useState(false);

  const openGroup = useCallback(async () => {
    const response = await customAxios.get(`/groups/${groupId}`);
    setGroupData(response.data.group);
    setIsShowing(prev => !prev);
  }, [groupId]);

  return (
    <>
      <MyTeam onClick={openGroup}>
        <section className="team-image">
          <div>대충 이미지</div>
        </section>
        <section className="team-info">
          <div>{groupName}</div>
          {position && <div>{positions[position]}</div>}
        </section>
      </MyTeam>
      {groupData && isShowing && (
        <GroupDetail data={groupData} setIsShowing={setIsShowing} />
      )}
    </>
  );
};

export default Team;
