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
  n: '팀원'
};

const MyGroup = styled.li`
  width: 95%;
  height: 52px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 11px;

  & .group-image {
    ${basicTeamStyle}
    width: 20%;
    min-width: 74.74px;
    margin-right: 5px;
    border: none;
    & img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  & .group-info {
    ${basicTeamStyle}
    width: 60%;
    min-width: 247.44px;
    display: flex;
    justify-content: space-between;
    background-color: #f6f6f6;
    border: 1px solid #f6f6f6;
    line-height: 52px;

    & .group-info-name {
      font-size: 0.9rem;
    }

    & .group-info-position {
      font-size: 0.8rem;
    }

    & .group-application {
      width: 10%;
      display: flex;
      flex-direction: column;
      font-size: 0.7rem;
    }
  }
`;

const Group = ({ id, groupName, position = null, type, data = null }) => {
  const [isShowing, setIsShowing] = useState(false);
  const router = useRouter();
  const moveDetailInfo = useCallback(async () => {
    if (type === 'group') {
      return router.push(`/group/${id}`);
    }
    setIsShowing(prev => !prev);
  }, []);

  return (
    <>
      <MyGroup onClick={moveDetailInfo}>
        <section className="group-image">
          <img
            src={
              data && data.Group.GroupImages?.length
                ? data.Group.GroupImages[0].URL
                : '/images/teamimg.jpg'
            }
            alt={
              data && data.Group.GroupImages?.length
                ? data.Group.GroupImages[0].description
                : '기본 이미지'
            }
          />
        </section>
        <section className="group-info">
          <div className="group-info-name">{groupName}</div>
          {position && (
            <div className="group-info-position">{positions[position]}</div>
          )}
          {type !== 'group' && (
            <div className="group-application">
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
