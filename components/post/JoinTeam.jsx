import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
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
    background: #6055cd;
    border-color: #6055cd;
    z-index: 5;

    & :active::before {
      background-color: #6055cd;
      border-color: #6055cd;
    }

    & :hover::before {
      background-color: #6055cd;
      border-color: #6055cd;
    }
  }

  &
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):active::before {
    background-color: #6055cd;
    border-color: #6055cd;
  }

  & .ant-radio-button-wrapper {
    background: rgba(0, 0, 0, 0);
    border-color: #6055cd;
    color: #6055cd;
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
      ${basicStyle}
      border: none;
      border-bottom: 1px solid #000000;
    }
  }
`;

const ContainerHeader = styled(ModalHeader)`
  line-height: 25px;
  color: #ffffff;
  background-color: #6055cd;

  & .post-info {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & .user-name {
      font-size: 12px;
    }
    & .group-info {
      font-weight: bold;
      font-size: 15px;
    }
  }
`;

const JoinGroup = ({ category, groupName }) => {
  const { me } = useSelector(state => state.user);

  const year = new Date().getFullYear();
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
            <div className="user-name">{me.name}님의 모임 참여 신청</div>
            <div className="group-info">
              {groupName} | {category}
            </div>
          </div>
        </ContainerHeader>
        <main className="join-content">
          <section className="basic-info">
            <div className="subtitle">기본 정보</div>
            <div className="join-content-detail">
              <div className="join-content-detail-element">
                <div>이름</div>
                <div>{me.name}</div>
                <div>나이</div>
                <div>{year - Number(me.birthday.split('-')[0]) + 1}</div>
                <div>성별</div>
                <Radio.Group
                  defaultValue={me.gender}
                  buttonStyle="solid"
                  onChange={onChangeGender}
                  size="small"
                >
                  <Radio.Button value="female">F</Radio.Button>
                  <Radio.Button value="male">M</Radio.Button>
                </Radio.Group>
                <div>이메일</div>
                <div>{me.email}</div>
                <div>연락처</div>
                <div>{me.telephone}</div>
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
                <input placeholder="요청사항을 입력해 보세요" />
              </div>
            </div>
          </section>
        </main>
      </Container>
    </Modal>
  );
};

export default JoinGroup;
