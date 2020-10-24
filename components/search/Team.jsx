import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { basicBoxStyle } from '../../public/style';
import PostDetail from '../post/PostDetail';

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
  const [showingPost, setShowingPost] = useState(false);

  const clickTeam = useCallback(() => {
    setShowingPost(prev => !prev);
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
      {showingPost ? (
        <PostDetail data={data} setShowingPost={setShowingPost} />
      ) : null}
    </>
  );
};

export default Team;
