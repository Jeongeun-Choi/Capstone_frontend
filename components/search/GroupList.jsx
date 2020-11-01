import React from 'react';
import styled from '@emotion/styled';
import Item from './Item';

const GroupContainer = styled.ul`
  width: 95%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GroupList = ({ category, groups }) => {
  return (
    <GroupContainer>
      {groups.map(group => (
        <Item
          type="group"
          name={group.name}
          id={group.id}
          category={category}
          location={group.location}
          image={group.GroupImages[0]}
        />
      ))}
    </GroupContainer>
  );
};

export default GroupList;
