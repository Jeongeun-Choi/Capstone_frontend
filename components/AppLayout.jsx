import React, { useEffect, useRef } from 'react';
import Footer from './main/Footer';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { loadMyInfoRequestAction } from '../reducers/user';
import { message } from 'antd';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

//로그인, 회원가입, 그룹 상세, 모집글 상세,회원탈퇴
// /login, /signup, group/id, recruit/id, setting/withdrawal

const notNeedFooterPages = ['login', 'signup'];
const haveSecondPathes = ['group', 'recruit', 'setting'];

const AppLayout = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const mounted = useRef(null);
  const { me } = useSelector(state => state.user);
  const [, pathName, secondPath] = router.pathname.split('/');

  useEffect(() => {
    dispatch(loadMyInfoRequestAction());
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (mounted.current && pathName !== 'signup' && pathName !== 'login') {
      message.error('로그인이 필요합니다.');
      router.push('/login');
    }
  }, [me.id]);

  return (
    <AppContainer ref={mounted}>
      {children}
      {!notNeedFooterPages.includes(pathName) &&
        !(haveSecondPathes.includes(pathName) && secondPath) && (
          <Footer pathName={pathName} />
        )}
    </AppContainer>
  );
};

export default AppLayout;
