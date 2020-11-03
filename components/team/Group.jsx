import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { basicTeamStyle } from '../../public/style';
import customAxios from '../../utils/baseAxios';
import GroupDetail from '../post/GroupDetail';
import WritingPost from '../writing/WritingPost';
import MakingGroup from './MakingGroup';

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
  }
`;

const Group = ({ groupId, groupName, position, type, data }) => {
  const [groupData, setGroupData] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const [modify, setModify] = useState(false);

  const openGroup = useCallback(async () => {
    const response = await customAxios.get(`/groups/${groupId}`);
    setGroupData(response.data.group);
    setIsShowing(prev => !prev);
  }, [groupId, data]);

  return (
    <>
      <MyGroup onClick={openGroup}>
        <section className="group-image">
          <img
            src={
              data.Group.GroupImages.length
                ? data.Group.GroupImages[0].URL
                : '/images/teamimg.jpg'
            }
            alt={
              data.Group.GroupImages.length
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
        </section>
      </MyGroup>
      {type === 'post'
        ? groupData &&
          isShowing && <WritingPost data={data} setIsShowing={setIsShowing} />
        : groupData &&
          isShowing && (
            <GroupDetail
              data={groupData}
              setIsShowing={setIsShowing}
              setModify={setModify}
            />
          )}
      {modify && (
        <MakingGroup
          data={groupData}
          modify={modify}
          setCloseModal={setModify}
        />
      )}
    </>
  );
};

export default Group;
