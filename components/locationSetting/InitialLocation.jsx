import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { basicStyle, Modal } from '../../public/style';
import Selection from './Selection';
import { useSelector, useDispatch } from 'react-redux';
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

  img {
    width: 90px;
    height: 85px;
  }
  h2 {
    font-weight: bold;
  }
`;

const Button = styled.button`
  ${basicStyle};
  width: 90%;
  color: #f8faff;
  border: 1px solid #cba6c3;
  border-radius: 17.5px;
  background-color: #cba6c3;
`;

const SkipButton = styled.button`
  ${basicStyle};
  width: 90%;
  border: none;
  border-radius: 17.5px;
  background-color: rgba(0, 0, 0, 0);
`;

const InitialLocation = ({ setShowingInitialLocation }) => {
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showingSelection, setShowingSelection] = useState(false);

  useEffect(() => {
    !me.id &&
      dispatch(loadJoingroupsRequestAction({ id: me.id })) &&
      dispatch(loadApplyGroupsRequestAction({ id: me.id })) &&
      dispatch(loadRecruitsRequestAction({ id: me.id }));
  }, [me.id && me]);

  const openSelectionModal = useCallback(e => {
    e.preventDefault();
    setShowingSelection(prev => !prev);
  }, []);

  const closeSelectionModal = useCallback(e => {
    e.preventDefault();
    setShowingInitialLocation(prev => !prev);
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
          <Button onClick={openSelectionModal}>
            활동 선호 지역과 관심 분야 설정하기
          </Button>
          <SkipButton onClick={closeSelectionModal}>다음에 할래요</SkipButton>
        </InitialLocationContainer>
      </Modal>

      {showingSelection ? (
        <Selection
          setShowingSelection={setShowingSelection}
          setShowingInitialLocation={setShowingInitialLocation}
        />
      ) : null}
    </>
  );
};

export default InitialLocation;
