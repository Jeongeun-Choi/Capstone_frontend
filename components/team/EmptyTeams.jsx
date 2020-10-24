import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { Modal } from 'antd';
import ProvedComponent from './ProvedComponent';
import MakingTeam from './MakingTeam';

//어떻게 효율적으로 짤 수 있을까...
const content = {
  '나의 모임': [`원하는 모임이 없다면?\n만들어보세요!`, '모임 만들기'],
  '내가 지원한 모임': [`회원님과 잘 맞는 모임에 참여해보세요.`, '모임 참여하기']
};

const EmptyTeamsContainer = styled.main`
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

const EmptyTeams = ({ pageTab }) => {
  //임의로 실명인증이 안됐다고 설정함.
  const isProved = false;
  const [pText, aText] = content[pageTab];
  const [isAlertModal, setIsAlertModal] = useState(false);
  const [isProvedModal, setIsProvedModal] = useState(false);
  const [showingMakingTeamModal, setShowingMakingTeamModal] = useState(false);

  const openScreen = useCallback(() => {
    if (!isProved) {
      setIsProvedModal(prev => !prev);
    } else {
      setShowingMakingTeamModal(prev => !prev);
    }
    setIsAlertModal(prev => !prev);
  }, [isProved]);

  const openAlertModal = useCallback(() => {
    setIsAlertModal(prev => !prev);
  }, []);

  return (
    <>
      <EmptyTeamsContainer>
        <p>
          {pText.split('\n').map(text => (
            <span key={text}>
              {text}
              <br />
            </span>
          ))}
        </p>
        <button onClick={openAlertModal}>{aText}</button>
      </EmptyTeamsContainer>
      <Modal visible={isAlertModal} onOk={openScreen} onClose={openAlertModal}>
        <h4>모임 개설</h4>
        <div>새로운 모임을 개설하시겠습니까?</div>
      </Modal>
      {isProvedModal ? (
        <ProvedComponent
          setCloseModal={setIsProvedModal}
          setMakingTeam={setShowingMakingTeamModal}
        />
      ) : null}
      {showingMakingTeamModal ? <MakingTeam /> : null}
    </>
  );
};

export default EmptyTeams;
