import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { Modal } from 'antd';
import ProvedComponent from './ProvedComponent';
import MakingGroup from './MakingGroup';
import { useSelector } from 'react-redux';

const content = {
  '나의 모집글': [`모집 글을 작성하여 모임원을 모아보세요!`],
  '나의 모임': [`원하는 모임이 없다면?\n만들어보세요!`, '모임 만들기'],
  '내가 지원한 모임': [`회원님과 잘 맞는 모임에 참여해보세요.`, '모임 참여하기']
};

const EmptyGroupsContainer = styled.main`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & p {
    text-align: center;
  }
  & button {
    width: 10%;
    min-width: 120px;
    border: 1px solid #e2e2e2;
    text-align: center;
  }
`;

const EmptyGroups = ({ pageTab }) => {
  const { me } = useSelector(state => state.user);

  const [pText, aText] = content[pageTab];
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

  const openAlertModal = useCallback(() => {
    setIsAlertModal(prev => !prev);
  }, []);

  return (
    <>
      <EmptyGroupsContainer>
        <p>
          {pText &&
            pText.split('\n').map(text => (
              <span key={text}>
                {text}
                <br />
              </span>
            ))}
        </p>
        {pageTab !== '나의 모집글' && (
          <button onClick={openAlertModal}>{aText}</button>
        )}
      </EmptyGroupsContainer>
      <Modal visible={isAlertModal} onOk={openScreen} onClose={openAlertModal}>
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
