import React from 'react';
import styled from '@emotion/styled';
import Categorys from '../components/search/Categorys';

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: red; */

  .information {
    font-size: 9px;
    margin-bottom: 30px;
  }
`;

const search = () => {
  return (
    <SearchContainer>
      <div className="information">
        "모임명을 입력하거나, 아래의 카테고리를 선택하여 모임을 찾아보세요!"
      </div>
      <Categorys />
    </SearchContainer>
  );
};

export default search;
