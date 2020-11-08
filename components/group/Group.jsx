import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { basicTeamStyle } from '../../public/style';
import GroupDetail from '../post/GroupDetail';
import WritingPost from '../writing/WritingPost';
import MakingGroup from './MakingGroup';
import { ContainerFilled } from '@ant-design/icons';

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
      border-radius: 3px;
    }
    cursor: pointer;
    &:hover {
      opacity: 0.8;
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

    & .group-info-wrapper {
      & .group-info-name {
        font-weight: bold;
        font-size: 1rem;
        //border: 1px solid purple;
      }

      & .group-info-category,
      .group-info-location {
        font-size: 0.8rem;
        //border: 3px solid blue;
      }
    }

    & .group-info-position {
      font-size: 0.7rem;
      font-weight: bold;
      width: 20%;
      margin-left: 1rem;
    }

    @media screen and (min-width: 540px) {
      width: 80%;
      height: 12vh;
    }

    & .group-application {
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      font-size: 0.7rem;
      cursor: pointer;

      &:hover {
        color: grey;
      }
      & div {
        margin-top: 0.2rem;
        font-size: 0.5rem;
      }

      @media screen and (min-width: 780px) {
        width: 15%;
        font-size: 1.5rem;

        & div {
          font-size: 0.8rem;
        }

        & .read-application {
        }
      }
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
  toggleApply,
}) => {
  const router = useRouter();

  const [isShowing, setIsShowing] = useState(false);

  const moveDetailInfo = useCallback(async () => {
    if (type === 'group') {
      return router.push(`/group/${id}`);
    }
    setIsShowing((prev) => !prev);
  }, []);

  const onClickApply = () => {
    toggleApply(data);
  };

  return (
    <>
      <MyGroup>
        <section className='group-image' onClick={moveDetailInfo}>
          <img
            src={
              data && data.Group?.GroupImages?.length
                ? data.Group.GroupImages[0].URL
                : '/images/teamimg.jpg'
            }
            alt={
              data?.Group?.GroupImages?.length
                ? data.Group.GroupImages[0].description
                : '기본 이미지'
            }
          />
        </section>
        <section className='group-info'>
          <div className='group-info-category'>{categoryName}</div>
          <div className='group-info-name'>
            <b>{groupName}</b>
          </div>
          <div>{location && location.split(' ').slice(0, 3).join(' ')}</div>
          <div className='group-info-wrapper'></div>
          {position && (
            <div className='group-info-position'>{positions[position]}</div>
          )}
          {type === 'group' && !position && (
            <div className='group-application' onClick={onClickApply}>
              <ContainerFilled />
              <div>지원서 열람</div>
            </div>
          )}
        </section>
      </MyGroup>
      {isShowing && (
        <WritingPost id={id} setIsShowing={setIsShowing} type={type} />
      )}
    </>
  );
};

export default Group;
