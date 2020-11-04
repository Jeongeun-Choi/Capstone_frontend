import React from 'react';
import { basicBoxStyle } from '../../public/style';
import styled from '@emotion/styled';
import Link from 'next/link';
import { categoryNames } from '../../utils/categoryNames';


const CategoryBox = styled.li`
  ${basicBoxStyle}
  //TODO: ul 중앙정렬
  height: 100%;
  display: flex;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 8%;
  align-items: center;
  justify-content: space-around;
  background-color: #868686;
  opacity: 0.75;
  border-radius: 3px;

  color: white;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  font-size: 18px;
`;

const Category = ({ name }) => {
  return (
    <Link href="/search/[category]" as={`/search/${categoryNames[name]}`}>
      <CategoryBox>{name}</CategoryBox>
    </Link>
  );
};

export default Category;
