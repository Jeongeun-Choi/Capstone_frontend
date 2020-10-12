import React from 'react';
import EmptyTeams from './EmptyTeams';
import styled from '@emotion/styled';
import { basicTeamStyle } from '../../public/style';

const TeamsContainer = styled.main`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyTeam = styled.div`
  width: 95%;
  height: 52px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 11px;

  .team-image {
    ${basicTeamStyle}
    width: 20%;
    min-width: 74.74px;
  }
  .team-info {
    ${basicTeamStyle}
    width: 60%;
    min-width: 247.44px;
    display: flex;
    flex-direction: column;
    font-size: 11px;
  }
`;

const Teams = ({ tab }) => {
  return (
    // <EmptyTeams pageTab={tab} userName="최정은" />
    <TeamsContainer>
      <MyTeam>
        <section className="team-image">
          <div>대충 이미지</div>
        </section>
        <section className="team-info">
          <div>카테고리</div>
          <div>모임명</div>
          <div>시/구</div>
        </section>
      </MyTeam>
      <MyTeam>
        <section className="team-image">
          <div>대충 이미지</div>
        </section>
        <section className="team-info">
          <div>카테고리</div>
          <div>모임명</div>
          <div>시/구</div>
        </section>
      </MyTeam>
    </TeamsContainer>
  );
};

export default Teams;
