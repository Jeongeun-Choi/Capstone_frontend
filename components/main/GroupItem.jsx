import React from 'react';
import styled from '@emotion/styled';

const GroupItemWrapper = styled.li`
  width: 100%;
  & img {
    width: 100%;
  }
`;

const GroupItem = ({ group }) => {
  return (
    <GroupItemWrapper>
      {group.GroupImages?.length ? (
        <img
          src={group.GroupImages[0].URL}
          alt={group.GroupImages[0].description}
        ></img>
      ) : (
        <div>대체</div>
      )}
      {group.ActiveCategories?.length && (
        <div>
          {group.ActiveCategories.map((category) => (
            <span key={category.id}>{category.DetailCategory.name}</span>
          ))}
        </div>
      )}
      <div>{group.name}</div>
      <div>{group.location}</div>
    </GroupItemWrapper>
  );
};

export default GroupItem;
