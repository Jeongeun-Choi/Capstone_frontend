import React from 'react';
import styled from '@emotion/styled';
import Team from './Team';

const TeamsContainer = styled.main`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  & ul {
    list-style: none;
  }
`;

const Teams = ({ tab, groups }) => {
  return (
    <TeamsContainer>
      <ul>
        {groups.map(group => (
          <Team
            key={group.id}
            groupId={group.Group.id}
            groupName={group.Group.name}
            data={group}
          />
        ))}
      </ul>
    </TeamsContainer>
  );
};

export default Teams;
