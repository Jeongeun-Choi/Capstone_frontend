import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Modal } from '../../../public/style';
import styled from '@emotion/styled';
import {
  LeftOutlined,
  TeamOutlined,
  ContainerFilled,
  SettingFilled,
  EditOutlined
} from '@ant-design/icons';
import MakingGroup from '../MakingGroup';

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

const Setting = ({ setModify, setIsShowingSetting, setShowReview }) => {
  const router = useRouter();
  const groupId = router.query.id;
  const { me } = useSelector(state => state.user);
  const [isL, setIsL] = useState(false);

  const openReview = useCallback(() => {
    setIsShowingSetting(prev => !prev);
    setShowReview(prev => !prev);
  }, []);

  const goApplication = useCallback(() => {
    return router.push(`/group/application/${groupId}`);
  }, []);

  const closeModal = useCallback(() => {
    setIsShowingSetting(prev => !prev);
  }, []);

  const openModifyModal = useCallback(() => {
    setModify(prev => !prev);
    setIsShowingSetting(prev => !prev);
  }, []);

  useEffect(() => {
    const filterGroups = me.JoinGroups.filter(
      group => group.Group.id === parseInt(groupId)
    );

    const isMine = filterGroups.length
      ? filterGroups.every(group => group.position === 'L')
      : false;

    if (isMine) {
      setIsL(true);
    }
  }, []);

  return (
    <>
      <SettingModal zIndex={3}>
        <header>
          <LeftOutlined onClick={closeModal} />
        </header>
        <section className="setting-content">
          {isL && (
            <div className="setting-content-item" onClick={openModifyModal}>
              <div className="setting-content-item-icon">
                <SettingFilled />
              </div>
              <div>정보 수정</div>
            </div>
          )}
          {isL ? (
            <>
              <div className="setting-content-item" onClick={goApplication}>
                <div className="setting-content-item-icon">
                  <ContainerFilled />
                </div>
                <div>지원서 관리</div>
              </div>
            </>
          ) : (
            <>
              <div className="setting-content-item" onClick={openReview}>
                <div className="setting-content-item-icon">
                  <EditOutlined />
                </div>
                <div>모임 평가</div>
              </div>
            </>
          )}
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
