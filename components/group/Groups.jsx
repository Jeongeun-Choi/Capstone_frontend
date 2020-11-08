import React, { useState } from 'react';
import styled from '@emotion/styled';
import Group from './Group';
import ApplyModal from './ApplyModal';

const GroupsContainer = styled.main`
  width: 100%;
  height: 80vh;

  & ul {
    width: 100%;
    padding: 0 0.5rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Groups = ({ groups, type }) => {
  const [isShowingApply, setIsShowingApply] = useState(false);
  const [selectedApply, setSelectedApply] = useState({});

  const toggleApply = (data = {}) => {
    setSelectedApply(data);
    setIsShowingApply((prev) => !prev);
  };

  return (
    <GroupsContainer>
      <ul>
        {type === 'group'
          ? groups?.map((group) => (
              <Group
                key={group.id}
                id={group.Group?.id}
                groupName={group.Group?.name}
                position={group.position}
                location={group.Group?.location}
                categoryName={
                  group.Group?.ActiveCategories?.length
                    ? group.Group?.ActiveCategories[0].DetailCategory?.name
                    : ''
                }
                toggleApply={toggleApply}
                data={group}
                type={type}
              />
            ))
          : groups?.map((group) => (
              <Group
                key={group?.Group ? group.Group.id : group.id}
                id={group?.Group ? group.Group.id : group.id}
                groupName={group?.Group ? group.Group.name : group.title}
                data={group}
                type={type}
              />
            ))}
      </ul>
      {type === 'group' && isShowingApply && (
        <ApplyModal selectedApply={selectedApply} toggleApply={toggleApply} />
      )}
    </GroupsContainer>
  );
};

export default Groups;
