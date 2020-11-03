import React from 'react';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import useCheckResult from '../../hooks/useCheckResult';
import { withdrawRequestAction } from '../../reducers/user';

const Container = styled.section`
  width: 100%;
  height: calc(90% - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    width: 30vw;
    max-width: 300px;
    min-width: 200px;
  }

  & .text_wrapper {
    width: 100%;
    max-width: 500px;
    padding: 0 4rem;
  }

  & button {
    width: 100%;
    margin-top: auto;
    background: #aaabd3;
    height: 5vh;
    border: none;
    color: white;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Withdrawal = () => {
  const dispatch = useDispatch();
  const withdraw = () => {
    dispatch(withdrawRequestAction());
  };

  const [toggleShow, CheckScreen] = useCheckResult({
    pushUrl: '/',
    title: '회원 탈퇴 성공',
    content: '회원 탈퇴 되었습니다.',
    onClick: withdraw,
  });

  return (
    <Container>
      <img src='/images/logo.png' alt='로고'></img>
      <div className='text_wrapper'>
        <div>
          <strong>그동안 모두의 모임을 이용해주셔서 감사합니다.</strong>
        </div>
        <div>아래의 내용을 잘 확인하시고, 회원탈퇴를 진행해주세요.</div>

        <div>
          모두의 모임을 <strong>탈퇴 하시면</strong>
          <br />
          회원정보, 가입하신 팀, 그룹 피드, 대화내용이 초기화 되며{' '}
          <strong>복구하실 수 없습니다.</strong>
        </div>
        <div>
          정말로 탈퇴를 원하신다면
          <br /> 회원 탈퇴 버튼을 눌러주세요.
        </div>
      </div>

      <button onClick={toggleShow}>회원 탈퇴</button>
      <CheckScreen />
    </Container>
  );
};

export default Withdrawal;
