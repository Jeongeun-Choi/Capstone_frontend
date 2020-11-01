import React from 'react';
import { Tabs, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import MyInfo from './MyInfo';
import PreferCategory from './PreferCategory';
import PreferLocation from './PreferLocation';

const { TabPane } = Tabs;

const MyProfile = () => {
  return (
    <section>
      <div>
        <Avatar icon={<UserOutlined />}></Avatar>
        <span>이다경</span>님 안녕하세요
      </div>
      <Tabs defaultActiveKey='1' centered>
        <TabPane tab='개인정보설정' key='1'>
          <MyInfo />
        </TabPane>
        <TabPane tab='관심분야설정' key='2'>
          <PreferCategory />
        </TabPane>
        <TabPane tab='활동지역설정' key='3'>
          <PreferLocation />
        </TabPane>
      </Tabs>
    </section>
  );
};

export default MyProfile;
