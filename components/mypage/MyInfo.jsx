import React, { useState } from 'react';
import { SettingOutlined, LockOutlined } from '@ant-design/icons';

const MyInfo = () => {
  const [isModify, setIsModify] = useState(false);
  const changeStatus = () => {
    setIsModify((prev) => !prev);
  };

  return (
    <section>
      <div>
        <span>
          지원에 필요한 정보 및 지원 결과를 받아볼 이메일, 연락처 정보를
          입력해주세요.
        </span>
        <button onClick={changeStatus}>
          <SettingOutlined />
        </button>
      </div>
      <div>
        <div>이름{isModify && <LockOutlined />}</div>
        <div>이다경</div>
        <div>생년월일{isModify && <LockOutlined />}</div>
        <div>1996.05.22</div>
        <div>성별{isModify && <LockOutlined />}</div>
        <div>여자</div>
        <div>이메일</div>
        {isModify ? (
          <input value='asd@naver.com'></input>
        ) : (
          <div>asdf@naver.com</div>
        )}
        <div>휴대전화</div>
        {isModify ? (
          <input value='010xxxxxxx'></input>
        ) : (
          <div>asdf@naver.com</div>
        )}
      </div>
      {isModify && <button>수정 완료</button>}
    </section>
  );
};

export default MyInfo;
