import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Category from '../components/search/Category';
import { loadCategoryRequestAction } from '../reducers/category';
import Header from '../components/main/Header';

import { Input } from 'antd';
import { basicStyle } from '../public/style';

const { Search } = Input;
const SearchInput = styled(Search)`
  ${basicStyle}
  width: 90%;
  margin-top: 1rem;
`;
const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .information {
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 9px;
    margin-top: 10px;
    margin-bottom: 30px;
  }

  & .category-list {
    width: 80%;
    height: 15%;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    @media screen and (min-width: 1080px) {
      width: 60%;
    }
  }
`;

const search = () => {
  const dispatch = useDispatch();
  const { category } = useSelector(state => state.category);
  useEffect(() => {
    dispatch(loadCategoryRequestAction());
  }, []);

  return (
    <SearchContainer>
      <Header type="white" title="모임 검색" />
      <SearchInput />
      <div className="information">
        "모임명을 <b>입력</b>하거나, 아래의 <b>카테고리를 선택</b>하여 모임을
        찾아보세요!"
      </div>
      <ul className="category-list">
        {category.map(item => (
          <Category key={item.id} name={item.type} />
        ))}
      </ul>
    </SearchContainer>
  );
};

export default search;
