import React from 'react';
import styled from '@emotion/styled';
import GroupItem from './GroupItem';

const GroupListWrapper = styled.ul`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-template-rows: auto;
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  width: 100%;
  justify-content: center;
`;

const GroupList = ({ groups }) => {
  return (
    <GroupListWrapper>
      {groups.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </GroupListWrapper>
  );
};

export default GroupList;
