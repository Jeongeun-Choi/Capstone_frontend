import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { CloseOutlined } from '@ant-design/icons';
import { BasicInput, Button, SNSLogin, Modal } from '../../public/style';
import { useDispatch } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import useInputChangeHook from '../../hooks/useInputChangeHook';

const LoginContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .close {
    width: 50%;
    max-width: 600px;
    min-width: 270px;
    display: flex;
  }

  form {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    input,
    button {
      width: 90%;
    }
  }

  .horizon {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .sns-login {
    width: 90%;
    height: 15%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .signup {
    display: flex;

    .signup-button {
      color: #868686;
      background-color: rgba(0, 0, 0, 0);
      border: none;
    }
  }
`;

const Login = ({
  setShowingLogin,
  setShowingSignup,
  setShowingInitialLocation,
}) => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInputChangeHook('');
  const [password, onChangePassword] = useInputChangeHook('');

  const submitForm = useCallback(
    (e) => {
      e.preventDefault();
      try {
        dispatch(loginRequestAction({ email, password }));
        setShowingLogin((prev) => !prev);
        setShowingInitialLocation((prev) => !prev);
      } catch (error) {
        console.error(error);
      }
    },
    [email, password]
  );

  const closeLoginModal = useCallback(() => {
    setShowingLogin((prev) => !prev);
  }, []);

  const openSignupModal = useCallback(() => {
    setShowingSignup((prev) => !prev);
    setShowingLogin((prev) => !prev);
  }, []);

  return (
    <Modal>
      <LoginContainer>
        <div className='close'>
          <CloseOutlined onClick={closeLoginModal} />
        </div>
        <h2>로그인</h2>
        <form onSubmit={submitForm}>
          <BasicInput
            onChange={onChangeEmail}
            value={email}
            placeholder='이메일'
            type='email'
          />
          <BasicInput
            onChange={onChangePassword}
            value={password}
            placeholder='비밀번호'
            type='password'
          />
          <Button>로그인</Button>
        </form>
        <div>비밀번호를 잊으셨나요?</div>
        <div className='horizon'>-----또는-----</div>
        <div className='sns-login'>
          <SNSLogin>카카오계정으로 로그인</SNSLogin>
          <SNSLogin>구글계정으로 로그인</SNSLogin>
        </div>
        <div className='signup'>
          <div>아직 모두의 모임의 회원이 아니신가요?</div>
          <button className='signup-button' onClick={openSignupModal}>
            회원가입
          </button>
        </div>
      </LoginContainer>
    </Modal>
  );
};

export default Login;
