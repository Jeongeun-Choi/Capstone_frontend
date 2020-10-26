import React from 'react';
import styled from '@emotion/styled';
import { LeftOutlined, InfoCircleOutlined } from '@ant-design/icons';

const CustomHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: ${(props) => props.color};
  background: ${(props) => props.backgroundColor};

  & .out_button {
    font-size: 1.5rem;
    margin-left: 2rem;
  }

  & .header_title {
    text-align: center;
    & h1 {
      margin: 0;
    }
  }

  & .declare_button {
    font-size: 1.5rem;
    margin-right: 2rem;
  }
`;

const Header = ({
  backgroundColor = 'white',
  color = 'black',
  subTitle,
  title,
  backButton = false,
  declareButton = false,
}) => {
  return (
    <CustomHeader backgroundColor={backgroundColor} color={color}>
      <div className='out_button'>{backButton && <LeftOutlined />}</div>
      <div className='header_title'>
        {subTitle && <div>{subTitle}</div>}
        <h1>{title}</h1>
      </div>
      <div className='declare_button'>
        {declareButton && <InfoCircleOutlined />}
      </div>
    </CustomHeader>
  );
};

export default Header;
