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
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 15px;
    text-align: center;
  }
  & button {
    width: 90%;
    height: 8%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #6055CD;
    border-radius: 18px;
    background-color: #6055CD;
    color: white;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: regular;
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
      {showingMakingTeamModal ? (
        <MakingTeam setCloseModal={setShowingMakingTeamModal} />
      ) : null}
    </>
  );
};

export default EmptyTeams;
