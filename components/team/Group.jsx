import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { basicTeamStyle } from '../../public/style';
import customAxios from '../../utils/baseAxios';
import GroupDetail from '../post/GroupDetail';
import WritingPost from '../writing/WritingPost';

const positions = {
  L: '모임장',
  n: '팀원'
};

const MyGroup = styled.li`
  width: 95%;
  height: 52px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 11px;

  .group-image {
    ${basicTeamStyle}
    width: 20%;
    min-width: 74.74px;
  }
  .group-info {
    ${basicTeamStyle}
    width: 60%;
    min-width: 247.44px;
    display: flex;
    flex-direction: column;
    font-size: 11px;
  }
`;

const Group = ({ groupId, groupName, position, type, data }) => {
  const [groupData, setGroupData] = useState(null);
  const [isShowing, setIsShowing] = useState(false);

  const openGroup = useCallback(async () => {
    const response = await customAxios.get(`/groups/${groupId}`);
    setGroupData(response.data.group);
    setIsShowing(prev => !prev);
  }, [groupId]);

  return (
    <>
      <MyGroup onClick={openGroup}>
        <section className="group-image">
          <div>대충 이미지</div>
        </section>
        <section className="group-info">
          <div>{groupName}</div>
          {position && <div>{positions[position]}</div>}
        </section>
      </MyGroup>
      {type === 'post'
        ? groupData &&
          isShowing && <WritingPost data={data} setIsShowing={setIsShowing} />
        : groupData &&
          isShowing && (
            <GroupDetail data={groupData} setIsShowing={setIsShowing} />
          )}
    </>
  );
};

export default Group;
