import styled from '@emotion/styled';
import { css } from '@emotion/core';

/**
 * 
 회: #868686
 흰: #F8FAFF
 보: #6055CD
 핑: #CBA6C3 
 남: #353866
 노: #FBD14B
 */

//변수명 어케 바꾸지...
export const basicStyle = css`
  width: 100%;
  height: 35px;
  max-width: 600px;
  min-width: 270px;
  border-radius: 5px;
`;

export const basicBoxStyle = css`
  width: 45%;
  height: 100%;
  min-height: 90px;
  min-width: 130px;
  border: 1px solid #a2a2a2;
`;

export const basicTeamStyle = css`
  width: 100%;
  height: 52px;
  background-color: #f6f6f6;
  border: 1px solid #f6f6f6;
  border-radius: 3px;
`;

export const modalFooter = css`
  width: 100%;
  min-height: 50px;
  z-index: 2;
  position: sticky;
  bottom: 0;
`;

export const Modal = styled.div`
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: ${props => (props.zIndex ? props.zIndex : 1)};
  background-color: #ffffff;
`;

export const ModalHeader = styled.header`
  width: 100%;
  height: 75px;
  border-bottom: 1px solid #a2a2a2;
  line-height: 75px;
  z-index: 3;
  position: sticky;
  top: 0;

  .anticon-left {
    position: absolute;
    top: 25px;
    left: 20px;
    font-size: 20px;
  }

  h3 {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    font-weight: bold;
  }
  .anticon-close {
    position: absolute;
    top: 25px;
    right: 20px;
    font-size: 20px;
  }
`;

export const BasicInput = styled.input`
  ${basicStyle}
  box-sizing: border-box;
  // border: 1px solid #e5e5e5;
  // background-color: #e5e5e5;
  border: 1px solid #c4c4c4;
  background-color: white;
  opacity: 0.5;
  font-family: 'Nanum Gothic', sans-serif;
`;

export const ShortInput = styled(BasicInput)`
  width: 20%;
  min-width: 70px;
  margin-right: 5px;
`;

export const Button = styled.button`
  ${basicStyle}
  color: white;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: regular;
  border: 1px solid #6055cd;
  border-radius: 18px;
  background-color: #6055cd;
`;

export const SNSLogin = styled.div`
  ${basicStyle}
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: normal;
  text-align: center;
  //color: #868686;
  //border: 1px solid #868686;
  border-radius: 18px;
  line-height: 35px;
  color: #6055cd;
  border: 1px solid #6055cd;
`;
