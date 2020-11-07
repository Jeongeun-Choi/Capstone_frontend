import React from 'react';
import Footer from './main/Footer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

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

  const [, pathName, secondPath] = router.pathname.split('/');
  return (
    <AppContainer>
      {children}
      {!notNeedFooterPages.includes(pathName) &&
        !(haveSecondPathes.includes(pathName) && secondPath) && (
          <Footer pathName={pathName} />
        )}
    </AppContainer>
  );
};

export default AppLayout;
