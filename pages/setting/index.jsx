import React from 'react';
import SettingMain from '../../components/setting/SettingMain';
import Header from '../../components/main/Header';

const setting = () => {
  return (
    <>
      <Header type="white" backButton={true} title="설정" />
      <SettingMain />
    </>
  );
};

export default setting;
