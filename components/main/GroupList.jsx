import React from 'react';
import styled from '@emotion/styled';
import GroupItem from './GroupItem';

const GroupListWrapper = styled.ul`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  padding: 1rem 0;
  row-gap: 0.5rem;
  column-gap: 1.5rem;
  width: 100%;
  justify-content: center;
  //border: 1px solid red;

  @media screen and (max-width: 580px) {
    grid-template-columns: 40% 40%;
  }

  @media screen and (min-width: 1080px) {
    grid-template-columns: 20% 20% 20% 20%;
  }
`;

const GroupList = ({ groups }) => {
  return (
    <GroupListWrapper>
      {groups?.map((group) => (
        <GroupItem key={group.id} group={group} />
      ))}
    </GroupListWrapper>
  );
};

export default GroupList;
