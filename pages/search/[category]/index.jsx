import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Team from '../../../components/search/Team';

const SearchContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & .filter {
    width: 95%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const index = () => {
  const router = useRouter();
  const { posts } = useSelector(state => state.post);
  const { category } = router.query;
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const filterPosts = posts.filter(post => post.category === category);
    setTeams(filterPosts);
  }, [posts]);

  return (
    <SearchContainer>
      <div className="filter">
        {teams.map(team => (
          <Team key={team.name} data={team} />
        ))}
      </div>
    </SearchContainer>
  );
};

export default index;
