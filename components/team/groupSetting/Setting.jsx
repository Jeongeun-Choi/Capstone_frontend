import React, { useCallback } from 'react';
import { Modal } from '../../../public/style';
import styled from '@emotion/styled';
import {
  LeftOutlined,
  TeamOutlined,
  ContainerFilled,
  SettingFilled
} from '@ant-design/icons';

const SettingModal = styled(Modal)`
  background-color: rgba(0, 0, 0.4, 0.7);

  & header {
    width: 100%;
    height: 75px;
    & .anticon-left {
      position: absolute;
      top: 25px;
      left: 20px;
      font-size: 1.5rem;
      color: #ffffff;
    }
  }

  & .setting-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
    & .setting-content-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #ffffff;

      & .setting-content-item-icon {
        font-size: 3rem;
      }
    }
  }
`;

const Setting = ({ setIsShowingSetting }) => {
  const closeModal = useCallback(() => {
    setIsShowingSetting(prev => !prev);
  }, []);

  return (
    <>
      <SettingModal zIndex={3}>
        <header>
          <LeftOutlined onClick={closeModal} />
        </header>
        <section className="setting-content">
          <div className="setting-content-item">
            <div className="setting-content-item-icon">
              <SettingFilled />
            </div>
            <div>정보 수정</div>
          </div>
          <div className="setting-content-item">
            <div className="setting-content-item-icon">
              <ContainerFilled />
            </div>
            <div>지원서 관리</div>
          </div>
          <div className="setting-content-item">
            <div className="setting-content-item-icon">
              <TeamOutlined />
            </div>
            <div>나의 팀원</div>
          </div>
        </section>
      </SettingModal>
    </>
  );
};

export default Setting;
