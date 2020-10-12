import React from 'react';
import { basicBoxStyle } from '../../public/style';
import styled from '@emotion/styled';
import Link from 'next/link';

const CategoryBox = styled.div`
  ${basicBoxStyle}
`;

const Category = ({ category, name }) => {
  return (
    <Link href="/search/[category]" as={`/search/${category}`}>
      <CategoryBox>{name}</CategoryBox>
    </Link>
  );
};

export default Category;
