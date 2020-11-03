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
  justify-content: center;
  align-items: center;
`;

const { Search } = Input;
const SearchInput = styled(Search)`
  ${basicStyle}
  width: 90%;
`;

const type = {
  purple: { backgroundColor: '#AAABD3', color: 'white' },
  white: { backgroundColor: 'white', color: 'black' }
};

const pathNameMap = {
  search: {
    ...type.white,
    backButton: false,
    declareButton: false,
    closeButton: false,
    title: '모임 검색'
  },
  writing: {
    ...type.white,
    backButton: false,
    declareButton: false,
    closeButton: false,
    title: '모집글 등록'
  },
  group: {
    ...type.purple,
    backButton: false,
    declareButton: false,
    closeButton: false,
    title: '모임 관리'
  },
  mypage: {
    ...type.white,
    backButton: true,
    title: '마이페이지'
  }
};

const AppLayout = ({ children }) => {
  const router = useRouter();
  const [, pathName] = router.pathname.split('/');
  return (
    <AppContainer>
      <Header {...pathNameMap[pathName]} />
      {pathName.includes('search') ? <SearchInput /> : null}
      {children}
      <Footer pathName={pathName} />
    </AppContainer>
  );
};

export default AppLayout;
