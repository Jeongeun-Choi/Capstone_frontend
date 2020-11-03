import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logoutRequestAction } from '../../reducers/user';
import useCheckResult from '../../hooks/useCheckResult';
import styled from '@emotion/styled';

const SettingMainContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2f2f7;
  & .setting_list {
    width: 100%;
    max-width: 500px;
    margin: 2rem 0;
    border-top: 1px solid grey;
    background: white;
    & li {
      width: 100%;
      height: 2rem;
      padding: 0.5rem;
      line-height: 1rem;
      border-bottom: 1px solid grey;
    }
  }

  & .button_wrapper {
    width: 100%;
    max-width: 500px;

    &:first-of-type {
      margin-top: 2rem;
    }
    & button {
      width: 100%;
      height: 2rem;
      border: none;
      border-top: 1px solid grey;
      border-bottom: 1px solid grey;
      background: white;
      color: white;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    & .logout_button {
      background-color: #aaabd3;
    }
    & .withdraw_button {
      background-color: #e74c3c;
    }
  }
`;

const SettingMain = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [toggleShow, CheckScreen] = useCheckResult({
    pushUrl: '/',
    title: '로그아웃 성공',
    content: '로그아웃 되었습니다.',
  });

  const logout = () => {
    dispatch(logoutRequestAction());
    toggleShow();
  };

  const withrawMember = () => {
    router.push('/setting/withdrawal');
  };

  return (
    <SettingMainContainer>
      <ul className='setting_list'>
        <li>푸시 알림</li>
        <li>서비스 소개</li>
        <li>이용약관</li>
        <li>개인정보 처리 방침</li>
        <li>자주 묻는 질문</li>
        <li>고객센터</li>
      </ul>

      <ul className='setting_list'>
        <li>버전정보</li>
        <li>오픈 소스 라이선스</li>
      </ul>

      <div className='button_wrapper'>
        <button className='logout_button' onClick={logout}>
          로그 아웃
        </button>
      </div>
      <div className='button_wrapper'>
        <button className='withdraw_button' onClick={withrawMember}>
          회원 탈퇴
        </button>
      </div>

      <CheckScreen />
    </SettingMainContainer>
  );
};

export default SettingMain;
