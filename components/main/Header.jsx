import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import {
  LeftOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  MoreOutlined
} from '@ant-design/icons';

// const type = {
//   purple: { backgroundColor: '#6055CD', color: 'white' },
//   white: { backgroundColor: 'white', color: 'black' }
// };

const type = {
  purple: { backgroundColor: 'white', color: '#6055CD' },
  white: { backgroundColor: 'white', color: 'black' }
};

const CustomHeader = styled.header`
  width: 100%;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  font-weight: bold;
  color: ${props => type[props.type].color};
  background: ${props => type[props.type].backgroundColor};
  border-bottom: 1px solid #868686;

  & .out_button {
    font-size: 1.3rem;
    margin-top: 0.5rem;
    margin-left: 1.8rem;
    cursor: pointer;
    @media screen and (min-width: 780px) {
      width: 2.5rem;
      margin-left: 1rem;
    }
  }

  & .header_title { 
    margin-top: 0.2rem;
    font-size: 0.8rem;
    text-align: center;
    white-space: nowrap; 
    width: 50%;
    overflow:hidden;
    text-overflow: ellipsis;

    & h1 {
      margin: 0;
      font-size: 1rem;
      font-weight: bold;
      color: ${props => type[props.type].color};
    }
  }

  & .second_button {
    font-size: 1.3rem;
    margin-top: 0.5rem;
    margin-right: 1.8rem;
    cursor: pointer;
    @media screen and (min-width: 780px) {
      width: 2.5rem;
      margin-right: 1rem;
    }
  }
`;

const Header = ({
  type = 'white',
  subTitle,
  title,
  backButton = false,
  declareButton = false,
  declareOnClick,
  closeButton = false,
  closeOnClick,
  moreButton = false,
  moreOnClick
}) => {
  const router = useRouter();

  return (
    <CustomHeader type={type}>
      <div className="out_button" onClick={() => router.back()}>
        {backButton && <LeftOutlined />}
      </div>
      <div className="header_title">
        {subTitle && <div>{subTitle}</div>}
        <h1>{title}</h1>
      </div>
      <div className="second_button">
        {declareButton && (
          <div onClick={declareOnClick}>
            <InfoCircleOutlined />
          </div>
        )}
        {closeButton && (
          <div onClick={closeOnClick}>
            <CloseOutlined />
          </div>
        )}
        {moreButton && (
          <div onClick={moreOnClick}>
            <MoreOutlined />
          </div>
        )}
      </div>
    </CustomHeader>
  );
};

export default Header;
