import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal,
  ModalHeader,
  basicStyle,
  modalFooter
} from '../../public/style';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { LeftOutlined } from '@ant-design/icons';
import { Radio, message } from 'antd';
import customAxios from '../../utils/baseAxios';
import useCheckResult from '../../hooks/useCheckResult';
import useInputChangeHook from '../../hooks/useInputChangeHook';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .join-content-detail {
    width: 100%;

    & .detail-q {
      margin-top: 0.5rem;
      //border: 1px solid blue;
    }

    & .detail-a {
      //border: 1px solid green;
    }
  }

  & .basic-info {
    width: 90%;
    ${basicStyle}
    & .subtitle {
      font-weight: bold;
      font-size: 1rem;
      // border: 1px solid red;
      margin-top: 1.5rem;
    }

    & input {
      border: none;
      width: 100%;
    }
  }

  & .additional-info {
    & input {
      border: none;
      border-bottom: 1px solid #000000;
    }

    & input[type='radio'] {
      margin-top: 0.5rem;
      width: 12px;
      height: 12px;
    }

    & .radio-wrapper {
      width: 33%;
      display: inline;
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

const ContainerFooter = styled.button`
  ${modalFooter};
  color: #ffffff;
  background-color: #6055cd;
  border: 1px solid #6055cd;
  font-weight: bold;
  margin-top: auto;
`;

const JoinGroup = ({ category, groupName, groupId, setShowingJoinModal }) => {
  const { me } = useSelector(state => state.user);
  const router = useRouter();
  const year = new Date().getFullYear();
  const [gender, setGender] = useState('');
  const [portfolio, onChangePortfolio] = useInputChangeHook('');
  const [activityPeriod, setActivityPeriod] = useState('3MonthOver');

  const [toggleScreen, Screen] = useCheckResult({
    title: '가입 지원',
    content: '가입 지원 되었습니다.',
    pushUrl: '/group'
  });
  const closeModal = useCallback(() => {
    setShowingJoinModal(prev => !prev);
  }, []);
  const onChangeGender = useCallback(e => {
    setGender(e.target.value);
  }, []);

  const onChangePeriod = useCallback(e => {
    setActivityPeriod(e.target.value);
  }, []);

  const submitResult = useCallback(
    async e => {
      e.preventDefault();
      const data = {
        memberId: me.id,
        groupId,
        activityPeriod,
        portfolio
      };

      try {
        await customAxios.post(`/apply-group`, data);
        toggleScreen();
      } catch (err) {
        console.log(err);
        message.error('이미 지원한 모임입니다.');
        // router.push('/');
      }
    },
    [portfolio, groupId, me.id, activityPeriod]
  );

  return (
    <Modal zIndex="3">
      <Container>
        <ContainerHeader>
          <LeftOutlined onClick={closeModal} />
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
                <div className="detail-q">✦ 이름</div>
                <div className="detail-a">{me.name}</div>
                <div className="detail-q">✦ 나이</div>
                <div className="detail-a">
                  {me.birthday && year - Number(me.birthday.split('-')[0]) + 1}
                </div>
                <div className="detail-q">✦ 성별</div>
                <div className="detail-a">{me.gender ? '여성' : '남성'}</div>
                {/* <input
                  type="text"
                  className="detail-a"
                  value={me.gender ? '여성' : '남성'}
                  readonly
                /> */}
                <div className="detail-q">✦ 이메일</div>
                <div className="detail-a">{me.email}</div>
                <div className="detail-q">✦ 연락처</div>
                <div className="detail-a">{me.telephone}</div>
              </div>
            </div>
            <div className="additional-info">
              <div className="subtitle">추가 정보</div>
              <div className="join-content-detail">
                <div className="detail-q">✦ 예상 활동 기간</div>
                <div className="radio-wrapper">
                  <input
                    id="3MonthUnder"
                    type="radio"
                    name="actMonth"
                    value="3MonthUnder"
                    onChange={onChangePeriod}
                  />{' '}
                  <label htmlFor="3MonthUnder">3개월 미만 </label>
                </div>
                <div className="radio-wrapper">
                  <input
                    id="3MonthOver"
                    type="radio"
                    name="actMonth"
                    value="3MonthOver"
                    onChange={onChangePeriod}
                  />{' '}
                  <label htmlFor="3MonthOver">3개월 이상 </label>
                </div>
                <div className="radio-wrapper">
                  <input
                    id="6MonthOver"
                    type="radio"
                    name="actMonth"
                    value="6MonthOver"
                    onChange={onChangePeriod}
                  />{' '}
                  <label htmlFor="6MonthOver">6개월 이상 </label>
                </div>
                <div className="detail-q">✦ 요청사항</div>
                <input
                  value={portfolio}
                  onChange={onChangePortfolio}
                  placeholder="요청사항을 입력해 보세요"
                />
              </div>
            </div>
          </section>
        </main>
        <ContainerFooter onClick={submitResult}>제출하기</ContainerFooter>
      </Container>
      <Screen />
    </Modal>
  );
};

export default JoinGroup;
