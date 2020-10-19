import React from 'react';
import styled from '@emotion/styled';
import { Divider } from 'antd';
import { Modal, ModalHeader, modalFooter } from '../../public/style';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const SelectionContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .setting {
    width: 90%;
    height: 90px;
  }
`;

const Footer = styled.button`
  ${modalFooter}
  color: #ffffff;
  background-color: #cba6c3;
  border: 1px solid #cba6c3;
  font-weight: bold;
`;

const Selection = () => {
  return (
    <Modal>
      <SelectionContainer>
        <ModalHeader>
          <LeftOutlined />
          <h3>지역 및 관심분야 설정</h3>
        </ModalHeader>
        <Divider />
        <section className="setting">
          <div className="section-header">
            <div>활동 선호 지역 설정 (0/3)</div>
            <RightOutlined />
          </div>
        </section>
        <Divider />
        <section className="setting">
          <div className="section-header">
            <div>관심 분야 설정 (0/3)</div>
            <RightOutlined />
          </div>
        </section>
        <Footer>설정하기</Footer>
      </SelectionContainer>
    </Modal>
  );
};

export default Selection;
