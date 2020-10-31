import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { BasicInput, ShortInput, Button, Modal } from '../../public/style';
import { Switch } from 'antd';
import inputChangeHook from '../../hooks/inputChangeHook';
import { useDispatch } from 'react-redux';
import { signupRequestAction } from '../../reducers/user';

const SignupForm = styled.form`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
  const [email, onChangeEmail] = inputChangeHook('');
  const [password, onChangePassword] = inputChangeHook('');
  const [passwordCheck, onChangePasswordCheck] = inputChangeHook('');
  const [name, onChangeName] = inputChangeHook('');
  const [birthYear, onChangeBirthYear] = inputChangeHook(0);
  const [birthMonth, onChangeBirthMonth] = inputChangeHook(0);
  const [birthDay, onChangeBirthDay] = inputChangeHook(0);
  const [telephone, onChangeTelephone] = inputChangeHook(0);
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
    },
    [email, name, password, telephone, gender, birthYear, birthMonth, birthDay]
  );

  const changeGender = useCallback(checked => {
    setGender(checked);
  }, []);

  return (
    <Modal zIndex={3}>
      <SignupForm onSubmit={signUp}>
        <div className="input-div">
          <div className="input-kind">
            <div>이메일*</div>
          </div>
          <BasicInput onChange={onChangeEmail} value={email} type="email" />
        </div>
        <div className="input-div">
          <div className="input-kind">
            <div>비밀번호*</div>
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
            <div>비밀번호 확인*</div>
          </div>
          <BasicInput
            onChange={onChangePasswordCheck}
            value={passwordCheck}
            type="password"
          />
        </div>
        <div className="input-div">
          <div className="input-kind">
            <div>이름*</div>
          </div>
          <BasicInput onChange={onChangeName} value={name} type="text" />
        </div>
        <div className="input-div">
          <div className="input-kind">
            <div>생년월일*</div>
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
                checkedChildren="여성"
                unCheckedChildren="남성"
              />
            </div>
          </div>
        </div>
        <div className="input-div">
          <div className="input-kind">
            <div>휴대전화*</div>
          </div>
          <BasicInput
            onChange={onChangeTelephone}
            value={telephone}
            type="number"
          />
        </div>
        <div className="input-div">
          <Button htmlType="submit">확인</Button>
        </div>
      </SignupForm>
    </Modal>
  );
};

export default Signup;