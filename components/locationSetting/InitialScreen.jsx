import React from 'react';
import styled from '@emotion/styled';
import { basicStyle, Modal } from '../../public/style';

const InitialScreenContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h2{
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
  background-color: rgba( 0, 0, 0, 0 );
`;

const InitialScreen = () => {
  return (
    <Modal>
      <InitialScreenContainer>
        <div>로고 이미지</div>
        <h2>
          모두의 모임을
          <br />더 쉽게 이용하는 방법
        </h2>
        <h6>
          관심있는 모임이 등록되면
          <br />
          추천해드릴게요
        </h6>
        <Button>활동 선호 지역과 관심 분야 설정하기</Button>
        <SkipButton>다음에 할래요</SkipButton>
      </InitialScreenContainer>
    </Modal>
  );
};

export default InitialScreen;
