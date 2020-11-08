import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

const GroupItemWrapper = styled.li`
  width: 100%;
  height: 40vh;
  margin-top: 1rem;
  cursor: pointer;
  transition: opacity 0.5s;
  //border: 1px solid blue;

  &:hover {
    opacity: 0.8;
  }
  & img {
    width: 100%;
    height: 70%;
  }

  .group-category, .group-location {
    font-size: 0.8rem;
  }

  .group-name {
    font-size: 1rem;
    font-weight: bold;
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
          <img src='/images/logo.png' alt='대체 이미지' />
        )}
        {group.ActiveCategories?.length ? (
          <div className='group-category'>
            {group.ActiveCategories.map((category) => (
              <span key={category.id}>{category.DetailCategory.name}</span>
            ))}
          </div>
        ) : (
          <></>
        )}
        <div className='group-name'>{group.name}</div>
        <div className='group-location'>{group.location?.split(' ').slice(0, 3).join(' ')}</div>
      </GroupItemWrapper>
    </>
  );
};

export default GroupItem;
