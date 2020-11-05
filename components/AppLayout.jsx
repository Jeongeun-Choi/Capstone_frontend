import React from 'react';
import Header from './main/Header';
import Footer from './main/Footer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import { basicStyle } from '../public/style';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const { Search } = Input;
const SearchInput = styled(Search)`
  ${basicStyle}
  width: 90%;
`;

const type = {
  purple: { backgroundColor: '#6055CD', color: 'white' },
  white: { backgroundColor: 'white', color: 'black' }
};

const AppLayout = ({ children }) => {
  const router = useRouter();
  const pathNameMap = {
    writing: {
      ...type.white,
      backButton: false,
      declareButton: false,
      closeButton: false,
      title: '모집글 등록'
    },
    team: {
      ...type.purple,
      backButton: false,
      declareButton: false,
      closeButton: false,
      title: '모임명',
      subTitle: '아무거나'
    },
    mypage: {
      ...type.white,
      backButton: true,
      title: '마이페이지',
      moreButton: true,
      moreOnClick: () => router.push('/setting')
    },
    setting: {
      ...type.white,
      backButton: true,
      title: '설정'
    },
    withdrawal: {
      ...type.white,
      backButton: true,
      title: '회원탈퇴'
    }
  };

  const [, pathName, secondPath] = router.pathname.split('/');
  return (
    <AppContainer>
      <Header {...pathNameMap[secondPath || pathName]} />
      {pathName.includes('search') ? <SearchInput /> : null}
      {children}
      <Footer pathName={pathName} />
    </AppContainer>
  );
};

export default AppLayout;
