import React, { useState, useCallback } from 'react';
import {
  Modal,
  ModalHeader,
  BasicInput,
  ShortInput,
  modalFooter
} from '../../public/style';
import styled from '@emotion/styled';
import { Select } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const ProvedContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & main {
    & p {
      text-align: center;
    }
    & .form-item {
      width: 90%;
    }

    & .form-item-phone {
      display: flex;
    }
  }
`;

const ModalFooter = styled.button`
  ${modalFooter}
  color: #ffffff;
  background-color: #aaabd3;
  border: 1px solid #aaabd3;
  font-weight: bold;
  position: fixed;
  bottom: 0;
`;

const ProvedComponent = ({ setCloseModal, setMakingTeam }) => {
  const [mobile, setMobile] = useState('');
  const moblieChange = useCallback(value => {
    setMobile(value);
  }, []);

  const proveUser = useCallback(e => {
    e.preventDefault();
    setCloseModal(prev => !prev);
    setMakingTeam(prev => !prev);
  }, []);

  const closeModal = useCallback(() => {
    setCloseModal(prev => !prev);
  }, []);

  return (
    <Modal>
      <ProvedContainer>
        <ModalHeader>
          <LeftOutlined onClick={closeModal} />
          <h3>실명인증</h3>
        </ModalHeader>
        <main>
          <p>
            안전하고 즐거운 모임 운영을 위해
            <br />
            실명인증을 해주세요.
          </p>
          <div className="form-content">
            <div className="form-item">
              <div>
                이름<span>*</span>
              </div>
              <BasicInput />
            </div>
            <div className="form-item">
              <div>
                통신사<span>*</span>
              </div>
              <Select defaultValue="SKT" onChange={moblieChange}>
                <Select.Option value="SKT">SKT</Select.Option>
                <Select.Option value="KT">KT</Select.Option>
                <Select.Option value="LG">LG</Select.Option>
              </Select>
            </div>
            <div className="form-item form-item-phone">
              <div>
                휴대전화번호<span>*</span>
              </div>
              <ShortInput />
              <button>전송</button>
            </div>
            <div className="form-item">
              <div>
                인증번호<span>*</span>
              </div>
              <BasicInput />
            </div>
          </div>
          <div>인증번호가 도착하지 않는다면? 재전송</div>
        </main>
        <ModalFooter onClick={proveUser}>완료</ModalFooter>
      </ProvedContainer>
    </Modal>
  );
};

export default ProvedComponent;
