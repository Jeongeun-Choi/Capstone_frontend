import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Modal, message } from 'antd';
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
    border: 1px solid #6055cd;
    border-radius: 18px;
    background-color: #6055cd;
    color: white;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: regular;
  }
`;

const EmptyGroups = ({ pageTab }) => {
  const { me } = useSelector(state => state.user);
  const router = useRouter();
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
    if (pageTab === '나의 모임') {
      return setIsAlertModal(prev => !prev);
    }
    message.info('모임 검색 창으로 이동합니다.');
    router.push('/search');
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
      <Modal visible={isAlertModal} onOk={openScreen} onCancel={openAlertModal}>
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
