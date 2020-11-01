import React from 'react';
import styled from '@emotion/styled';
import Group from './Group';

const GroupsContainer = styled.main`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  & ul {
    list-style: none;
  }
`;

const Groups = ({ groups, type }) => {
  return (
    <GroupsContainer>
      <ul>
        {groups.map(group => (
          <Group
            key={group.id}
            groupId={group.Group.id}
            groupName={group.Group.name}
            data={group}
            type={type}
          />
        ))}
      </ul>
    </GroupsContainer>
  );
};

export default Groups;
