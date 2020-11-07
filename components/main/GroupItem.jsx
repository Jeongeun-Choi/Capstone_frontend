import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const GroupItemWrapper = styled.li`
  width: 100%;
  height: 40vh;
  cursor: pointer;
  transition: opacity 0.5s;
  &:hover {
    opacity: 0.8;
  }
  & img {
    width: 100%;
    height: 70%;
  }
`;

const GroupItem = ({ group }) => {
  const router = useRouter();

  const moveDetailInfo = useCallback(async () => {
    router.push(`/group/${group.id}`);
  }, []);

  return (
    <>
      <GroupItemWrapper onClick={moveDetailInfo}>
        {group.GroupImages?.length ? (
          <img
            src={group.GroupImages[0].URL}
            alt={group.GroupImages[0].description}
          ></img>
        ) : (
          <img src="/images/logo.png" alt="대체 이미지" />
        )}
        {group.ActiveCategories?.length ? (
          <div>
            {group.ActiveCategories.map(category => (
              <span key={category.id}>{category.DetailCategory.name}</span>
            ))}
          </div>
        ) : (
          <></>
        )}
        <div>{group.name}</div>
        <div>{group.location}</div>
      </GroupItemWrapper>
    </>
  );
};

export default GroupItem;