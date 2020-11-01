import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import {
  LeftOutlined,
  InfoCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';

const CustomHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  color: ${(props) => props.color};
  background: ${(props) => props.backgroundColor};
  border-bottom: 1px solid grey;

  & .out_button {
    font-size: 1.8rem;
    margin-left: 2rem;
    cursor: pointer;
  }

  & .header_title {
    text-align: center;
    & h1 {
      margin: 0;
      color: ${(props) => props.color};
    }
  }

  & .second_button {
    font-size: 1.8rem;
    margin-right: 2rem;
    cursor: pointer;
  }
`;

const Header = ({
  backgroundColor = 'white',
  color = 'black',
  subTitle,
  title,
  backButton = false,
  declareButton = false,
  closeButton = false,
}) => {
  const router = useRouter();

  return (
    <CustomHeader backgroundColor={backgroundColor} color={color}>
      <div className='out_button' onClick={() => router.back()}>
        {backButton && <LeftOutlined />}
      </div>
      <div className='header_title'>
        {subTitle && <div>{subTitle}</div>}
        <h1>{title}</h1>
      </div>
      <div className='second_button'>
        {declareButton && <InfoCircleOutlined />}
        {closeButton && <CloseOutlined />}
      </div>
    </CustomHeader>
  );
};

export default Header;
