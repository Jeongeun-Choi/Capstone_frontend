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
    vertical-algin: middle;
    //font-size: 11px;
  }

  .info-category{
    height: 100%;
    width: 60%;
    min-width: 247.44px;
    display: flex;
    margin-left: 5px;
    flex-direction: column;
    
    font-family: 'Nanum Gothic', sans-serif;
    font-style: regular;
    font-size: 10px;
    line-height: 20px;
    color: #000000;
    //color: #4211D0;
  }

  .info-name{
    height: 100%;
    width: 60%;
    min-width: 247.44px;
    display: flex;
    margin-left: 5px;
    flex-direction: column;

    font-family: 'Nanum Gothic', sans-serif;
    font-style: regular;
    font-weight: bold;
    font-size: 13px;
    line-height: 10px;
    //color: #000000;
    color: #4211D0;
  }

  .info-location{ 
    height: 100%;
    width: 60%;
    min-width: 247.44px;
    display: flex;
    margin-left: 5px;
    flex-direction: column;
    
    font-family: 'Nanum Gothic', sans-serif;
    font-style: regular;
    font-size: 10px;
    line-height: 10px;
    color: #000000;
    //color: #4211D0;
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
          <div className = "info-category">카테고리</div>
          <div className = "info-name">모임명</div>
          <div className = "info-location">시/구</div>
        </section>
      </MyTeam>
      <MyTeam>
        <section className="team-image">
          <div>대충 이미지</div>
        </section>
        <section className="team-info">
          <div className = "info-category">카테고리</div>
          <div className = "info-name">모임명</div>
          <div className = "info-location">시/구</div>
        </section>
      </MyTeam>
    </TeamsContainer>
  );
};

export default Teams;
