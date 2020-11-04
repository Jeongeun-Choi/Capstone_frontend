import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { Modal } from 'antd';
import ProvedComponent from './ProvedComponent';
import MakingGroup from './MakingGroup';
import { useSelector } from 'react-redux';

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

export default EmptyTeams;
