import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { basicStyle } from '../../public/style';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import ProvedComponent from '../team/ProvedComponent';
import MakingGroup from '../team/MakingGroup';

const EmptyGroupsContainer = styled.main`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .emptygroups-button {
    ${basicStyle};
    width: 90%;
    color: #f8faff;
    border: 1px solid #cba6c3;
    border-radius: 17.5px;
    background-color: #cba6c3;
  }
`;

const EmptyGroups = () => {
  const { me } = useSelector(state => state.user);
  const [isAlertModal, setIsAlertModal] = useState(false);
  const [isProvedModal, setIsProvedModal] = useState(false);
  const [showingMakingTeamModal, setShowingMakingTeamModal] = useState(false);

  const openScreen = useCallback(() => {
    if (!me.isProved) {
      setIsProvedModal(prev => !prev);
    } else {
      setShowingMakingTeamModal(prev => !prev);
    }
    setIsAlertModal(prev => !prev);
  }, [me]);

  const setAlertModal = useCallback(() => {
    setIsAlertModal(prev => !prev);
  }, []);

  return (
    <>
      <EmptyGroupsContainer>
        <div>"모집글을 작성할 수 있는 모임이 없어요!"</div>
        <button
          className="emptygroups-button"
          type="button"
          onClick={setAlertModal}
        >
          모임 등록하러 가기
        </button>
      </EmptyGroupsContainer>
      <Modal visible={isAlertModal} onOk={openScreen} onCancel={setAlertModal}>
        <h4>모임 개설</h4>
        <div>새로운 모임을 개설하시겠습니까?</div>
      </Modal>
      {isProvedModal && (
        <ProvedComponent
          setCloseModal={setIsProvedModal}
          setMakingTeam={setShowingMakingTeamModal}
        />
      )}
      {showingMakingTeamModal && (
        <MakingGroup setCloseModal={setShowingMakingTeamModal} />
      )}
    </>
  );
};

export default EmptyGroups;
