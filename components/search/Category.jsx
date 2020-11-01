import React from 'react';
import { basicBoxStyle } from '../../public/style';
import styled from '@emotion/styled';
import Link from 'next/link';
import { categoryNames } from '../../utils/categoryNames';

const CategoryBox = styled.li`
  ${basicBoxStyle}
  max-height: 90px;
  max-width: 500px;
  margin-right: 15px;
  margin-bottom: 20px;
`;

const Category = ({ name }) => {
  return (
    <Link href="/search/[category]" as={`/search/${categoryNames[name]}`}>
      <CategoryBox>{name}</CategoryBox>
    </Link>
  );
};

export default Category;
