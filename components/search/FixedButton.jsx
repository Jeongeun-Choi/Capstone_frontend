import React from 'react';
import { MenuOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const FixedButtonContainer = styled.div`
  position: fixed;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  color: white;
  background: #6055CD;
  box-shadow: 3px 3px 3px grey; 
  right: 1rem;
  bottom: 60px;
  text-align: center;
  font-size: 2rem;
  line-height: 3.5rem;
  transition: opacity 0.5s;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const FixedButton = ({ onClick }) => {
  return (
    <FixedButtonContainer onClick={onClick}>
      <MenuOutlined />
    </FixedButtonContainer>
  );
};

export default FixedButton;
