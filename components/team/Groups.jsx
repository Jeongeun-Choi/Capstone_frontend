import React from 'react';
import styled from '@emotion/styled';
import Group from './Group';

const GroupsContainer = styled.main`
  width: 100%;
  height: 80vh;

  & ul {
    width: 90%;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Groups = ({ groups, type }) => {
  return (
    <GroupsContainer>
      <ul>
        {type === 'group'
          ? groups.map(group => (
              <Group
                key={group.id}
                groupId={group.Group.id}
                groupName={group.Group.name}
                position={group.position}
                data={group}
                type={type}
              />
            ))
          : groups.map(group => (
              <Group
                key={group.id}
                groupId={group.id}
                groupName={group.title}
                type={type}
              />
            ))}
      </ul>
    </GroupsContainer>
  );
};

export default Groups;
