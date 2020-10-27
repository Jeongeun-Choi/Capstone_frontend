import React from 'react';
import { Tabs } from 'antd';
import MyProfile from '../components/mypage/MyProfile';

const { TabPane } = Tabs;

const mypage = () => {
  return (
    <>
      <Tabs defaultActiveKey='1' centered>
        <TabPane tab='프로필' key='1'>
          <MyProfile />
        </TabPane>
        <TabPane tab='좋아요' key='2'></TabPane>
      </Tabs>
    </>
  );
};

export default mypage;
