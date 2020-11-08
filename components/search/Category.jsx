import React from 'react';
import { basicBoxStyle } from '../../public/style';
import styled from '@emotion/styled';
import Link from 'next/link';
import { categoryNames } from '../../utils/categoryNames';

const CategoryBox = styled.li`
  ${basicBoxStyle}
  max-height: 90px;
  max-width: 500px;
  position: relative;
  text-align: center;
  color: #ffffff;
  font-size: 1.1rem;
  border: none;

  display: flex;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 8%;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  & .img_text {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0.5, 0.5);
    border-radius: 5px;
  }
`;

const Category = ({ name }) => {
  return (
    <Link href="/search/[category]" as={`/search/${categoryNames[name]}`}>
      <CategoryBox>
        <img
          src={
            categoryNames[name] !== 'etc'
              ? `/images/${categoryNames[name]}.jpg`
              : `/images/logo.png`
          }
          alt={`${categoryNames[name]}`}
        />
        <div className="img_text">{name}</div>
      </CategoryBox>
    </Link>
  );
};

export default Category;
