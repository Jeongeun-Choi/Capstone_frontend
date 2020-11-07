import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { basicStyle, Modal } from '../../public/style';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  loadJoingroupsRequestAction,
  loadApplyGroupsRequestAction,
  loadRecruitsRequestAction
} from '../../reducers/user';

const InitialLocationContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Nanum Gothic', sans-serif;

  img {
    width: 90px;
    height: 85px;
  }
  h2 {
    width: 90%;
    font-weight: bold;
  }
  h6 {
    width: 90%;
    color: #868686;
    margin-bottom: 5%;
  }
`;

const Button = styled.button`
  ${basicStyle};
  width: 90%;
  color: #f8faff;
  border: 1px solid #EBE7F8;
  border-radius: 17.5px;
  font-weight: bold;
  background-color: #6055CD;
`;

const SkipButton = styled.button`
  ${basicStyle};
  width: 90%;
  margin-top: 1%;
  border: none;
  border-radius: 17.5px;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0);
`;

const InitialLocation = ({ setShowingModal }) => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    !me.joinGroups &&
      dispatch(loadJoingroupsRequestAction({ id: me.id })) &&
      dispatch(loadApplyGroupsRequestAction({ id: me.id })) &&
      dispatch(loadRecruitsRequestAction({ id: me.id }));
  }, [me.id && me]);

  const openSelection = useCallback(e => {
    e.preventDefault();
    setShowingModal(prev => !prev);
  }, []);

  const closeSelection = useCallback(e => {
    e.preventDefault();
    router.push('/');
  }, []);

  return (
    <>
      <Modal>
        <InitialLocationContainer>
          <img src={`/images/logo.png`} alt="로고 이미지" />
          <h2>
            모두의 모임을
            <br />더 쉽게 이용하는 방법
          </h2>
          <h6>
            관심있는 모임이 등록되면
            <br />
            추천해드릴게요
          </h6>
          <Button onClick={openSelection}>
            활동 선호 지역과 관심 분야 설정하기
          </Button>
          <SkipButton onClick={closeSelection}>다음에 할래요</SkipButton>
        </InitialLocationContainer>
      </Modal>
    </>
  );
};

export default InitialLocation;
