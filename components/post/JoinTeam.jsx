import React, { useState, useCallback } from 'react';
import { Modal, ModalHeader, basicStyle } from '../../public/style';
import styled from '@emotion/styled';
import { LeftOutlined } from '@ant-design/icons';
import { Radio } from 'antd';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .join-content-detail {
    width: 85%;
  }
  & .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    background: #aaabd3;
    border-color: #aaabd3;
    z-index: 5;

    & :active::before {
      background-color: #aaabd3;
      border-color: #aaabd3;
    }

    & :hover::before {
      background-color: #aaabd3;
      border-color: #aaabd3;
    }
  }

  &
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active::before {
    background-color: #aaabd3;
    border-color: #aaabd3;
  }

  & .ant-radio-button-wrapper {
    background: rgba(0, 0, 0, 0);
    border-color: #aaabd3;
    color: #aaabd3;
  }

  & .basic-info {
    width: 90%;

    & input {
      ${basicStyle}
      border: none;
      width: 100%;
    }
  }

  & .additional-info {
    & input {
      border: none;
      border-bottom: 1px solid #000000;
    }
  }
`;

const ContainerHeader = styled(ModalHeader)`
  line-height: 25px;
  color: #ffffff;
  background-color: #aaabd3;

  & .post-info {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .user-name {
      font-size: 12px;
    }
    & .team-info {
      font-weight: bold;
      font-size: 15px;
    }
  }
`;

const JoinTeam = ({ category, userName, teamName }) => {
  const [gender, setGender] = useState('');

  const onChangeGender = useCallback(e => {
    setGender(e.target.value);
  }, []);

  return (
    <Modal zIndex="3">
      <Container>
        <ContainerHeader>
          <LeftOutlined />
          <div className="post-info">
            <div className="user-name">{userName}님의 모임 참여 신청</div>
            <div className="team-info">
              {teamName} | {category}
            </div>
          </div>
        </ContainerHeader>
        <main className="join-content">
          <section className="basic-info">
            <div className="subtitle">기본 정보</div>
            <div className="join-content-detail">
              <div className="join-content-detail-element">
                <div>이름</div>
                <input type="text" placeholder="이름을 입력하세요." />
                <div>나이</div>
                <input type="number" placeholder="이름을 입력하세요." />
                <div>성별</div>
                <Radio.Group
                  defaultValue="female"
                  buttonStyle="solid"
                  onChange={onChangeGender}
                  size="small"
                >
                  <Radio.Button value="female">F</Radio.Button>
                  <Radio.Button value="male">M</Radio.Button>
                </Radio.Group>
                <div>이메일</div>
                <input type="email" placeholder="이름을 입력하세요." />
                <div>연락처</div>
                <input type="text" placeholder="이름을 입력하세요." />
              </div>
            </div>
            <div className="additional-info">
              <div className="subtitle">추가 정보</div>
              <div className="join-content-detail">
                <div>예상 활동 기간</div>
                <Radio.Group
                  defaultValue="3MonthOver"
                  buttonStyle="solid"
                  onChange={onChangeGender}
                  size="small"
                >
                  <Radio.Button value="3MonthUnder">3개월 미만</Radio.Button>
                  <Radio.Button value="3MonthOver">3개월 이상</Radio.Button>
                  <Radio.Button value="6MonthOver">6개월 이상</Radio.Button>
                </Radio.Group>
              </div>
              <div>
                <div>요청사항</div>
                <input />
              </div>
            </div>
          </section>
        </main>
      </Container>
    </Modal>
  );
};

export default JoinTeam;
