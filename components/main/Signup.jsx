import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import {
  BasicInput,
  ShortInput,
  Button,
  Modal,
  ModalHeader
} from '../../public/style';
import { Switch } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import useInputChangeHook from '../../hooks/useInputChangeHook';
import { useDispatch } from 'react-redux';
import { signupRequestAction } from '../../reducers/user';

const SignupContainer = styled.main`
  font-family: 'Nanum Gothic', sans-serif;
  width: 100%;
  height: 100vh;

  & .signup-form {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
      padding-left: 2%;
    }

    & .input-div {
      width: 90%;
      height: 10vh;
      max-width: 600px;
      min-width: 270px;
      margin-top: 3%;     
    }

    & .input-kind {
      width: 100%;
      height: 3vh;
      max-width: 600px;
      min-width: 270px;
      display: flex;
    }

    & span {
        color: #6055CD;
    }

    & .input-date {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    & .password-promise {
      font-size: 9px;
    }
  }
`;

const SignupForm = styled.form`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 3%;

  .input-div {
    width: 90%;
    height: 10vh;
    max-width: 600px;
    min-width: 270px;
  }

  .input-kind {
    width: 100%;
    height: 3vh;
    max-width: 600px;
    min-width: 270px;
    display: flex;
    padding: 1%;
  }

  .input-date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .password-promise {
    font-size: 9px;
  }
`;

const Signup = ({ setShowingSignup }) => {
  const [email, onChangeEmail] = useInputChangeHook('');
  const [password, onChangePassword] = useInputChangeHook('');
  const [passwordCheck, onChangePasswordCheck] = useInputChangeHook('');
  const [name, onChangeName] = useInputChangeHook('');
  const [birthYear, onChangeBirthYear] = useInputChangeHook(0);
  const [birthMonth, onChangeBirthMonth] = useInputChangeHook(0);
  const [birthDay, onChangeBirthDay] = useInputChangeHook(0);
  const [telephone, onChangeTelephone] = useInputChangeHook(0);
  const [gender, setGender] = useState('');

  const dispatch = useDispatch();
  const signUp = useCallback(
    e => {
      e.preventDefault();
      const birthday = `${String(birthYear)}-${String(birthMonth)}-${String(
        birthDay
      )}`;
      const testGender = gender ? 1 : 0;
      const data = {
        email,
        name,
        password,
        telephone,
        gender: testGender,
        birthday
      };
      dispatch(signupRequestAction(data));
      setShowingSignup(prev => !prev);
    },
    [email, name, password, telephone, gender, birthYear, birthMonth, birthDay]
  );

  const changeGender = useCallback(checked => {
    setGender(checked);
  }, []);

  const closeModal = useCallback(() => {
    setShowingSignup(prev => !prev);
  }, []);

  return (
    <Modal zIndex={3}>
      <SignupContainer>
        <ModalHeader>
          <LeftOutlined onClick={closeModal} />
          <h3>회원가입</h3>
        </ModalHeader>
        <form className="signup-form" onSubmit={signUp}>
          <div className="input-div">
            <div className="input-kind">
              <div>이메일&nbsp;<span>*</span></div>
            </div>
            <BasicInput onChange={onChangeEmail} value={email} type="email" />
          </div>
          <div className="input-div">
            <div className="input-kind">
              <div>비밀번호&nbsp;<span>*</span></div>
            </div>
            <BasicInput
              onChange={onChangePassword}
              value={password}
              type="password"
            />
            <div className="password-promise">
              영문 대소문자, 숫자, 특수문자 중 2가지 이상을 조합하여 10-16자
            </div>
          </div>
          <div className="input-div">
            <div className="input-kind">
              <div>비밀번호 확인&nbsp;<span>*</span></div>
            </div>
            <BasicInput
              onChange={onChangePasswordCheck}
              value={passwordCheck}
              type="password"
            />
          </div>
          <div className="input-div">
            <div className="input-kind">
              <div>이름&nbsp;<span>*</span></div>
            </div>
            <BasicInput onChange={onChangeName} value={name} type="text" />
          </div>
          <div className="input-div">
            <div className="input-kind">
              <div>생년월일&nbsp;<span>*</span></div>
            </div>
            <div className="input-date">
              <div className="short-input">
                <ShortInput
                  onChange={onChangeBirthYear}
                  value={birthYear}
                  type="number"
                  placeholder="YYYY"
                />
                <ShortInput
                  onChange={onChangeBirthMonth}
                  value={birthMonth}
                  type="number"
                  placeholder="MM"
                />
                <ShortInput
                  onChange={onChangeBirthDay}
                  value={birthDay}
                  type="number"
                  placeholder="DD"
                />
              </div>
              <div className="switch">
                <Switch
                  onChange={changeGender}
                  checkedChildren="여"
                  unCheckedChildren="남"
                />
              </div>
            </div>
          </div>
          <div className="input-div">
            <div className="input-kind">
              <div>휴대전화&nbsp;<span>*</span></div>
            </div>
            <BasicInput
              onChange={onChangeTelephone}
              value={telephone}
              type="number"
            />
          </div>
          <div className="input-div">
            <Button type="button" onClick={signUp}>
              제출
            </Button>
          </div>
        </form>
      </SignupContainer>
    </Modal>
  );
};

export default Signup;
