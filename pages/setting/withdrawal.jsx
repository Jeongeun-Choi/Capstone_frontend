import React from 'react';
import Withdrawal from '../../components/setting/Withdrawal';
import Header from '../../components/main/Header';

const withdrawal = () => {
  return (
    <>
      <Header type="white" backButton={true} title="회원탈퇴" />
      <Withdrawal />
    </>
  );
};

export default withdrawal;
