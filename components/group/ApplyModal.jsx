import React from 'react';
import { useSelector } from 'react-redux';
import { Modal, ModalHeader, basicStyle } from '../../public/style';
import styled from '@emotion/styled';
import { LeftOutlined } from '@ant-design/icons';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & .join-content {
    height: 100%;
    margin-top: 1.5rem;
    padding: 0 1.8rem;
  }

  & .join-content-detail {
    width: 85%;
    width: 100%;
    padding: 0 0.7rem;
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

  & .subtitle {
    //border: 1px solid orange;
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    padding-left: 0.3rem;
  }

  & .content-detail-q {
    font-size: 1rem;
    font-weight: bold;
    margin-top: 0.5rem;
  }

  & .content-detail-a {
    padding-left: 0.5rem;
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
      font-size: 1rem;
    }
  }
`;

const ApplyModal = ({ selectedApply, toggleApply, type = null }) => {
  const { me } = useSelector(state => state.user);
  const year = new Date().getFullYear();
  const {
    activityPeriod,
    applyDate,
    portfolio,
    Group,
    userInfo
  } = selectedApply;

  // const { name: groupName } = Group;
  const category = Group?.AcitiveCategories?.length
    ? Group.AcitiveCategories[0].DetailCategory.name
    : '';

  const name = type ? userInfo.name : me.name;
  const birthday = type ? userInfo.birthday : me.birthday;
  const gender = type ? userInfo.gender : me.gender;
  const email = type ? userInfo.email : me.email;
  const telephone = type ? userInfo.telephone : me.telephone;

  return (
    <Modal>
      <Container>
        <ContainerHeader>
          <LeftOutlined onClick={() => toggleApply()} />
          <div className="post-info">
            <div className="user-name">{name}님의 모임 참여 신청</div>
            {!type && (
              <div className="group-info">
                {Group?.name} {category && `| ${category}`}
              </div>
            )}
          </div>
        </ContainerHeader>
        <main className="join-content">
          <section className="basic-info">
            <div className="subtitle">기본 정보</div>
            <div className="join-content-detail">
              <section className="join-content-detail-element">
                <div className="content-detail-q">✦ 이름</div>
                <div className="content-detail-a">{name}</div>
                <div className="content-detail-q">✦ 나이</div>
                <div className="content-detail-a">
                  {birthday && year - Number(birthday.split('-')[0]) + 1}
                </div>
                <div className="content-detail-q">✦ 성별</div>
                <div className="content-detail-a">{gender ? 'W' : 'M'}</div>
                <div className="content-detail-q">✦ 이메일</div>
                <div className="content-detail-a">{email}</div>
                <div className="content-detail-q">✦ 연락처</div>
                <div className="content-detail-a">{telephone}</div>
              </section>
            </div>

            <section className="additional-info">
              <div className="subtitle">추가 정보</div>
              <div className="join-content-detail">
                <div className="content-detail-q">✦ 예상 활동 기간</div>
                <div className="content-detail-a">{activityPeriod}</div>
                <div>
                  <div className="content-detail-q">✦ 요구사항</div>
                  <div className="content-detail-a">{portfolio}</div>

                </div>
              </div>
            </section>
          </section>
        </main>
      </Container>
    </Modal>
  );
};

export default ApplyModal;
