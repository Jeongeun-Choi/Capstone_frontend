import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';
import { message } from 'antd';
import useInputChangeHook from '../hooks/useInputChangeHook';
import { BasicInput, Button, SNSLogin } from '../public/style';
import { useRouter } from 'next/router';

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .close {
    width: 50%;
    max-width: 600px;
    min-width: 270px;
    display: flex;
    margin: 0 0 0 150%;
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
      padding-left: 0.5rem;
      margin-top: 1%;
    }
  }

  .login {
    width: 90%;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;

    font-family: 'Nanum Gothic', sans-serif;
    color: #6055cd;
    font-weight: bold;
    font-size: 1.5rem;
    text-align: center;
    align-items: center;
  }

  .forgotPass {
    width: 90%;
    display: flex;
    justify-content: center;
    margin: 10px 0 5px 0;
    font-family: 'Nanum Gothic', sans-serif;
    font-weight: bold;
    font-size: 0.7rem;
    color: #6055cd;
  }

  .horizon {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 10px 0 13px 0;
    font-family: 'Nanum Gothic', sans-serif;
    font-size: 0.65rem;
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

  .signup {
    width: 100%;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .notYet {
      display: flex;
      justify-content: center;
      font-size: 0.7rem;
      color: #868686;
      margin-right: 1rem;
    }

    .signup-button {
      background-color: white;
      border: 0;
      outline: 0;
      color: #868686;
      font-size: 0.7rem;
      font-weight: bold;
    }
  }
`;

const login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me } = useSelector(state => state.user);
  const [email, onChangeEmail] = useInputChangeHook('');
  const [password, onChangePassword] = useInputChangeHook('');

  const submitForm = useCallback(
    e => {
      e.preventDefault();
      if (!email.trim() || !password.trim()) {
        return message.error('이메일과 비밀번호를 입력해주세요.');
      }
      try {
        dispatch(loginRequestAction({ email, password }));
      } catch (error) {
        console.error(error);
      }
    },
    [email, password]
  );

  useEffect(() => {
    me.id && router.push('/setting-info');
  }, [me]);

  return (
    <LoginContainer>
      <div className="login">로그인</div>
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
      <div className="signup">
        <div className="notYet">아직 회원이 아니신가요?</div>
        <button
          className="signup-button"
          onClick={() => router.push('/signup')}
        >
          회원가입
        </button>
      </div>
    </LoginContainer>
  );
};

export default login;
