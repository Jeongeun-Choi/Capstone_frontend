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

const AppLayout = ({ children }) => {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <AppContainer>
      <Header />
      {pathName.includes('search') ? <SearchInput /> : null}
      {children}
      <Footer pathName={pathName} />
    </AppContainer>
  );
};

export default AppLayout;
