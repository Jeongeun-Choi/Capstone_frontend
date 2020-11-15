import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import customAxios from '../../utils/baseAxios';
import {
  ContainerFilled,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';
import useCheckResult from '../../hooks/useCheckResult';

const ApplicationBox = styled.div`
  width: 95%;
  min-width: 247.44px;
  height: 3rem;
  line-height: 3rem;
  display: flex;
  background-color: #f6f6f6;
  margin-top: 1rem;
  padding: 0 1rem;

  & .user-name {
    font-size: 0.8em;
    width: 4.5rem;
    padding-left: 0.5rem;
  }

  & .user-email {
    font-size: 0.8em;
    width: 8rem;
  }

  & .application-select {
    font-size: 0.5rem;
  }

  & .group-application {
    display: flex;
    width: 30%;
    height: 3rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 0.8rem;
    cursor: pointer;

    &:hover {
      color: grey;
    }

    @media screen and (min-width: 780px) {
      width: 15%;
      font-size: 1.5rem;

      & div {
        font-size: 0.8rem;
      }

      & .read-application {
      }
    }
  }
  & .application-select {
    width: 3rem;
  }
`;

const Application = ({
  application,
  toggleApply,
  setApplications,
  applications
}) => {
  const { Member, approvalCheck } = application;
  const { id, email, name } = Member;
  const [userInfo, setUserInfo] = useState({});
  const { me } = useSelector(state => state.user);

  const [toggleApprove, AprroveScreen] = useCheckResult({
    title: '가입 확인',
    content: '가입이 승인 되었습니다.'
  });
  const [toggleReject, RejcetScreen] = useCheckResult({
    title: '가입',
    content: '가입이 거절되었습니다.'
  });
  const openApply = () => {
    toggleApply(application, userInfo);
  };

  const approve = async () => {
    const data = { memberId: me.id, applyId: application.id };
    try {
      await customAxios.post(`/join-group`, data);
      const newArray = applications.map(userApplication =>
        userApplication.id === application.id
          ? { ...userApplication, approvalCheck: true }
          : userApplication
      );
      toggleApprove();
      setApplications(newArray);
    } catch (error) {
      console.log(error);
    }
  };

  const reject = async () => {
    const data = {
      memberId: me.id,
      groupId: application.groupId,
      applyId: application.id
    };
    try {
      await customAxios.patch(`/apply-group`, data);
      const newArray = applications.map(userApplication =>
        userApplication.id === application.id
          ? { ...userApplication, approvalCheck: false }
          : userApplication
      );
      toggleReject();
      setApplications(newArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getInfo = async () => {
    const { data } = await customAxios.get(`/member/${id}`);
    setUserInfo(data.info);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <ApplicationBox>
      <div className="user-name">{name}</div>
      <div className="user-email">{email}</div>

      <div className="group-application" onClick={openApply}>
        <ContainerFilled />
      </div>
      {approvalCheck ? (
        <div className="group-application">승인 완료</div>
      ) : approvalCheck === null ? (
        <>
          <div className="group-application" onClick={approve}>
            <CheckOutlined style={{color:"#6055CD"}}/>
          </div>
          <div className="group-application" onClick={reject}>
            <CloseOutlined style={{color:"#ff6868"}}/>
          </div>
        </>
      ) : (
        <div className="group-application">승인 거부</div>
      )}
      <AprroveScreen />
      <RejcetScreen />
    </ApplicationBox>
  );
};

export default Application;
