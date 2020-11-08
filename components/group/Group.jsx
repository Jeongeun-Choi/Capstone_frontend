import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { basicTeamStyle } from '../../public/style';
import GroupDetail from '../post/GroupDetail';
import WritingPost from '../writing/WritingPost';
import MakingGroup from './MakingGroup';

const positions = {
  L: '모임장',
  N: '팀원',
};

const MyGroup = styled.li`
  width: 95%;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  cursor: pointer;

  @media screen and (min-width: 540px) {
    height: 12vh;
  }

  & .group-image {
    ${basicTeamStyle}
    width: 25%;
    height: 100%;
    min-width: 74.74px;
    margin-right: 0.5rem;
    border: none;
    & img {
      width: 100%;
      height: 100%;
    }
  }
  & .group-info {
    ${basicTeamStyle}
    width: 80%;
    min-width: 247.44px;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f6f6f6;
    border: 1px solid #f6f6f6;
    padding: 0 1rem;
    @media screen and (min-width: 540px) {
      width: 80%;
      height: 12vh;
    }
    & .group-info-name {
      font-weight: bold;
      font-size: 1.2rem;
    }

    & .group-info-position {
      font-size: 0.8rem;
    }
  }
`;

const Group = ({
  id,
  groupName,
  position = null,
  type,
  data = null,
  location,
  categoryName,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const router = useRouter();
  const moveDetailInfo = useCallback(async () => {
    if (type === 'group') {
      return router.push(`/group/${id}`);
    }
    return router.push(`/recruit/${id}`);
  }, []);

  return (
    <>
      <MyGroup onClick={moveDetailInfo}>
        <section className='group-image'>
          <img
            src={
              data && data.Group.GroupImages.length
                ? data.Group.GroupImages[0].URL
                : '/images/teamimg.jpg'
            }
            alt={
              data && data.Group.GroupImages.length
                ? data.Group.GroupImages[0].description
                : '기본 이미지'
            }
          />
        </section>
        <section className='group-info'>
          <div>
            <div>{categoryName}</div>
            <div className='group-info-name'>{groupName}</div>
            <div>{location}</div>
          </div>

          {position && (
            <div className='group-info-position'>{positions[position]}</div>
          )}
        </section>
      </MyGroup>
      {/* {type === 'group'
        ? isShowing && (
            <GroupDetail setIsShowing={setIsShowing} groupId={groupId} />
          )
        : isShowing && (
            <WritingPost id={groupId} setIsShowing={setIsShowing} type={type} />
          )} */}
    </>
  );
};

export default Group;
