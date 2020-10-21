import React from 'react';
import { basicBoxStyle } from '../../public/style';
import styled from '@emotion/styled';
import Link from 'next/link';

const CategoryBox = styled.li`
  ${basicBoxStyle}
  max-height: 180px;
  max-width: 500px;
  margin-right: 15px;
  margin-bottom: 20px;
`;

const Category = ({ category, name }) => {
  return (
    <Link href="/search/[category]" as={`/search/${category}`}>
      <CategoryBox>{name}</CategoryBox>
    </Link>
  );
};

export default Category;
