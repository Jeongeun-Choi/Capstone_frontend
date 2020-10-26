import React from 'react';
import { basicBoxStyle } from '../../public/style';
import styled from '@emotion/styled';
import Link from 'next/link';

const CategoryBox = styled.div`
  ${basicBoxStyle}
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  justify-content: space-around;
  background-color: #868686;
  opacity: 0.75;
  border-radius: 3px;

  color: white;
  font-family: Roboto;
  font-weight: bold;
  font-size: 18px;
`;

const Category = ({ category, name }) => {
  return (
    <Link href="/search/[category]" as={`/search/${category}`}>
      <CategoryBox>{name}</CategoryBox>
    </Link>
  );
};

export default Category;