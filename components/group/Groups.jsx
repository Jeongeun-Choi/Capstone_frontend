import React, { useState } from 'react';
import styled from '@emotion/styled';
import Group from './Group';
import { EditOutlined } from '@ant-design/icons';
import MakingGroup from './MakingGroup';

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
const Writing = styled.button`
  position: absolute;
  bottom: 3.8rem;
  right: 1.5rem;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid #353866;
  background-color: #353866;

  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
`;
const Groups = ({ groups, type }) => {
  const [openWritingModal, setOpenWritingModal] = useState(false);
  const clickWriting = () => {
    setOpenWritingModal(prev => !prev);
  };

  return (
    <>
      <GroupsContainer>
        <ul>
          {type === 'group'
            ? groups?.map(group => (
                <Group
                  key={group.id}
                  id={group.Group.id}
                  groupName={group.Group.name}
                  position={group.position}
                  location={group.Group.location}
                  categoryName={
                    group.Group?.ActiveCategories?.length &&
                    group.Group?.ActiveCategories[0].DetailCategory?.name
                  }
                  data={group}
                  type={type}
                />
              ))
            : groups?.map(group => (
                <Group
                  key={group?.Group ? group.Group.id : group.id}
                  id={group?.Group ? group.Group.id : group.id}
                  groupName={group?.Group ? group.Group.name : group.title}
                  data={group}
                  type={type}
                />
              ))}
        </ul>
        <Writing type="button" onClick={clickWriting}>
          <EditOutlined />
        </Writing>
      </GroupsContainer>
      {openWritingModal && <MakingGroup setCloseModal={setOpenWritingModal} />}
    </>
  );
};

export default Groups;
