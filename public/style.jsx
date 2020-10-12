import styled from '@emotion/styled';
import { css } from '@emotion/core';
/**
 흰: #F8FAFF
 보: #AAABD3
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
  height: 90px;
  min-width: 130px;
  border: 1px solid #a2a2a2;
`;

export const basicTeamStyle = css`
  width: 100%;
  height: 52px;
  border: 1px solid #a2a2a2;
  border-radius: 3px;
`;

export const Modal = styled.div`
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #ffffff;
`;

export const ModalFooter = styled.button`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10vh;
  max-height: 50px;
`;

export const ModalHeader = styled.header`
  width: 100%;
  height: 75px;

  .anticon-left {
    position: absolute;
    top: 15px;
    left: 10px;
    font-size: 20px;
  }
  h3 {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translate(-50%, 0);
    font-weight: bold;
  }
`;

export const Menubar = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  min-width: 320px;
  height: 5vh;
  max-height: 50px;
  display: flex;
`;

export const Menu = styled.a`
  width: 20%;
  min-width: 64px;
  height: 5vh;
  max-height: 50px;
  text-align: center;
`;

export const BasicInput = styled.input`
  ${basicStyle}
  box-sizing: border-box;
  border: 1px solid #a2a2a2;
`;

export const ShortInput = styled(BasicInput)`
  width: 20%;
  min-width: 70px;
  margin-right: 5px;
`;

export const Button = styled.button`
  ${basicStyle}
  color: #f8faff;
  border: 1px solid #aaabd3;
  background-color: #aaabd3;
`;

export const SNSLogin = styled.div`
  ${basicStyle}
  border: 1px solid black;
  line-height: 35px;
`;
