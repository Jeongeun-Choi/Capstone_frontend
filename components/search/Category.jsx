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
  position: relative;
  text-align: center;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  & img {
    width: 100%;
    height: 100%;
  }

  & .img_text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Category = ({ name }) => {
  return (
    <Link href="/search/[category]" as={`/search/${categoryNames[name]}`}>
      <CategoryBox>
        <img
          src={`/images/${categoryNames[name]}.jpg`}
          alt={`${categoryNames[name]}`}
        />
        <div className="img_text">{name}</div>
      </CategoryBox>
    </Link>
  );
};

export default Category;
