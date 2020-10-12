import React from 'react';
import styled from '@emotion/styled';

//어떻게 효율적으로 짤 수 있을까...
const content = {
  '나의 모임': userName => `원하는 모임이 없다면?만들어보세요!`,
  '내가 지원한 모임': userName => `${userName}님과 잘 맞는 모임에 참여해보세요.`
};

const EmptyTeamsContainer = styled.main`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    width: 10%;
    min-width: 120px;
    border: 1px solid #e2e2e2;
    text-align: center;
  }
`;

const EmptyTeams = ({ pageTab, userName }) => {
  return (
    <EmptyTeamsContainer>
      <p>{content[pageTab](userName)}</p>
      <a>모임 찾아보기</a>
    </EmptyTeamsContainer>
  );
};

export default EmptyTeams;
