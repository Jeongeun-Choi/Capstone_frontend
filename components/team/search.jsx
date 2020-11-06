import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import Category from '../components/search/Category';
import { loadPostsRequestAction } from '../reducers/post';

const categoryNames = {
  programing: '프로그래밍',
  game: '게임',
  sports: '스포츠',
  contest: '공모전',
  study: '스터디',
  music: '음악'
};

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .information {
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 9px;
    margin-top: 10%;
    margin-bottom: 30px;
  }

  & .category-list {
    width: 95%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
  }
`;

const search = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPostsRequestAction());
  }, []);

  return (
    <SearchContainer>
      <div className="information">
        "모임명을 <b>입력</b>하거나, 아래의 <b>카테고리를 선택</b>하여 모임을 찾아보세요!"
      </div>
      <ul className="category-list">
        {Object.keys(categoryNames).map(category => (
          <Category
            key={category}
            category={category}
            name={categoryNames[category]}
          />
        ))}
      </ul>
    </SearchContainer>
  );
};

export default search;
