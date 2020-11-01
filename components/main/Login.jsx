import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { CloseOutlined } from '@ant-design/icons';
import { BasicInput, Button, SNSLogin } from '../../public/style';
import { useDispatch } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';
import inputChangeHook from '../../hooks/inputChangeHook';

const LoginContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .close {
    width: 50%;
    max-width: 600px;
    min-width: 270px;
    display: flex;
    align-items: right;
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
      margin-top: 1%;
    }
  }
  
  .login{
    width: 90%;
    height: 5%;
    display: flex;
    flex-direction: column;
    margin: 5px 0 15px 0;

    font-family: 'Nanum Gothic', sans-serif;
    color: #4211D0;
    font-weight: bold;
    font-size: 23px;
    text-align: center;
    align-item: center;
  }

  .forgotPass{
    width: 90%;
    display: flex;
    justify-content: center;
    margin: 10px 0 5px 0;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: bold;
    font-size: 12px;
    //color: #868686;
    color: #4211D0;
  }

  .horizon {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 13px 0 13px 0;
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 11px;
    color: #868686;
    opacity: 0.7;
  }

  .sns-login {
    width: 90%;
    height: 15%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-family: 'Nanum Gothic', sans-serif;
  }

  .notYet{
    width: 90%;
    display: flex;
    justify-content: center;
    margin: 10px 0 0 0;

    font-family: 'Nanum Gothic', sans-serif;
    font-size: 12px;
    color: #868686;   
    //color: #4211D0;
  }
`;

const login = () => {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = inputChangeHook('');
  const [password, onChangePassword] = inputChangeHook('');

  const submitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch(loginRequestAction({ email, password }));
    },
    [email, password]
  );

  return (
    <LoginContainer>
      {/* 임의로 div 태그를 사용함. 나중엔 semantic tag으로 바꿀 것. */}
      <div className="close">
        <CloseOutlined />
      </div>
      <div className="login">
        로그인
      </div>

      <form onSubmit={submitForm}>
        <BasicInput
          onChange={onChangeEmail}
          value={email}
          placeholder="이메일"
          type="email"
        />
        <BasicInput
          onChange={onChangePassword}
          value={password}
          placeholder="비밀번호"
          type="password"
        />
        <Button>로그인</Button>
      </form>
      <div className="forgotPass">비밀번호를 잊으셨나요?</div>
      <div className="horizon">———————— 또는 ————————</div>
      <div className="sns-login">
        <SNSLogin>카카오계정으로 로그인</SNSLogin>
        <SNSLogin>구글계정으로 로그인</SNSLogin>
      </div>
      {/* 회원가입 부분은 next/link 사용 감싸준다.
        태그 안에 className, target과 같은 속성이 있으면 상위를 Link로 감싸고 해당 태그는 a 태그로 선언하라고한다.
      */}
      <div className="notYet">아직 모두의 모임의 회원이 아니신가요? 회원가입</div>
    </LoginContainer>
  );
};

export default login;
