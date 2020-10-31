import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { basicBoxStyle } from '../../public/style';
import GroupDetail from '../post/GroupDetail';

const TeamBox = styled.div`
  ${basicBoxStyle}
  max-height: 180px;
  max-width: 500px;
  margin-right: 15px;
  margin-bottom: 20px;
  border: none;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const Team = ({ data }) => {
  const { category, name, location } = data;
  const [isShowing, setIsShowing] = useState(false);

  const clickTeam = useCallback(() => {
    setIsShowing(prev => !prev);
  }, []);

  return (
    <>
      <TeamBox onClick={clickTeam}>
        <img src={`/images/teamimg.jpg`} />
        <div className="team-info">
          <div className="team-info-category">{category}</div>
          <div className="team-info-name">{name}</div>
          <div className="team-info-location">{location}</div>
        </div>
      </TeamBox>
      {isShowing && <GroupDetail data={data} setIsShowing={setIsShowing} />}
    </>
  );
};

export default Team;
