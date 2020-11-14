import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import customAxios from '../../utils/baseAxios';
import {
  ContainerFilled,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';

const ApplicationBox = styled.div`
  width: 95%;
  min-width: 247.44px;
  height: 3rem;
  line-height: 3rem;
  display: flex;
  background-color: #f6f6f6;
  padding: 0 1rem;

  & .group-application {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-size: 0.7rem;
    cursor: pointer;

    &:hover {
      color: grey;
    }
    & div {
      margin-top: 0.2rem;
      font-size: 0.5rem;
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
`;

const Application = ({
  application,
  toggleApply,
  setApplications,
  applications
}) => {
  const { Member } = application;
  const { id, email, name } = Member;
  const [userInfo, setUserInfo] = useState({});
  const { me } = useSelector(state => state.user);

  const openApply = () => {
    toggleApply(application, userInfo);
  };

  const approve = async () => {
    const data = { memberId: me.id, applyId: application.id };
    try {
      await customAxios.post(`/join-group`, data);
      const newArray = applications.filter(
        application => application.id !== application.id
      );
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
      const newArray = applications.filter(
        application => application.id !== application.id
      );
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
      <div>{name}</div>
      <div>{email}</div>
      <div className="group-application" onClick={openApply}>
        <ContainerFilled />
        <div>지원서 열람</div>
      </div>
      <div className="group-application" onClick={approve}>
        <CheckOutlined />
        <div>승인</div>
      </div>
      <div className="group-application" onClick={reject}>
        <CloseOutlined />
        <div>거절</div>
      </div>
    </ApplicationBox>
  );
};

export default Application;
