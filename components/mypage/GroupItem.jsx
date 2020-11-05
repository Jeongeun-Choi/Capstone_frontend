import React, { useState } from 'react';
import { BellOutlined, BellFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import customAxios from '../../utils/baseAxios';

const GroupItemWrapper = styled.li`
  width: 80%;
  max-width: 500px;
  min-width: 200px;
  margin: 0 auto;
  margin-top: 0.5rem;

  color: ${(props) => (props.recruiting ? '#6055CD' : '#868686')};
  & .item_wrapper {
    min-height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    border-radius: 8px;
    padding: 0.5rem 1rem;
    color: white;
    background: ${(props) => (props.recruiting ? '#6055CD' : '#868686')};
  }

  & .item_name {
    font-size: 1.2rem;
    font-weight: bold;
  }

  & .item_category {
    margin-right: 0.5rem;
  }

  & .alarm_button {
    font-size: 1.5rem;
  }
`;

const GroupItem = ({ memberId, group, recruiting, deadLine, toggleIsShow }) => {
  const [state, city] = group.location ? group.location.split(' ') : [];
  const [date] = deadLine ? deadLine.split(' ') : [];

  const [isModified, setModified] = useState(false);
  const modifyAlarm = async () => {
    await customAxios.put('/prefer-group', {
      memberId,
      groupId: group.id,
      type: isModified
        ? group.PreferGroups[0].type
        : !group.PreferGroups[0].type,
    });
    setModified((prev) => !prev);
    toggleIsShow();
  };

  return (
    <GroupItemWrapper recruiting={recruiting}>
      <div>
        {recruiting ? '모집 중' : '모집마감'} / {date}
      </div>
      <div className='item_wrapper'>
        <div>
          {group?.ActiveCategories.map((category) => (
            <span className='item_category' key={category.id}>
              {category.DetailCategory.name}
            </span>
          ))}
          <div className='item_name'>{group.name}</div>
          <div>{state && `${state} / ${city}`}</div>
        </div>
        <div className='alarm_button' onClick={modifyAlarm}>
          {(
            isModified
              ? !group.PreferGroups[0].type
              : group.PreferGroups[0].type
          ) ? (
            <BellFilled />
          ) : (
            <BellOutlined />
          )}
        </div>
      </div>
    </GroupItemWrapper>
  );
};

export default GroupItem;
