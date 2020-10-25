import React from 'react';
import styled from '@emotion/styled';
import { Modal, ModalHeader, moadalfooter } from '../../public/style';
import { LeftOutlined } from '@ant-design/icons';

const GroupContainer = styled.div`
  width: 100%;

  & .group-info {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .group-category {
    font-size: 14px;
  }
  & .group-name {
    font-size: 16px;
    font-weight: bold;
  }

  & .group-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: auto;

    & .big-img {
      margin-top: 20px;
      width: 100%;
      height: 30vh;
    }

    & .group-content-header {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      & .like {
        display: flex;
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-color: #f6f6f6;

        & .anticon-heart {
          margin: auto;
          font-size: 16px;
          color: #eb5757;
        }
      }
    }
  }
`;

const GroupHeader = styled(ModalHeader)`
  line-height: 25px;
  color: #ffffff;
  background-color: #aaabd3;

  & .anticon-exclamation-circle {
    position: absolute;
    top: 25px;
    right: 20px;
    font-size: 25px;
  }
`;

const GroupFooter = styled.button`
  ${modalFooter}
  color: #ffffff;
  background-color: #aaabd3;
  border: 1px solid #aaabd3;
  font-weight: bold;
`;

const Group = ({data}) => {
    const {id, name, memberCount, groupIntro, Skills, ActiveTimes, GroupImages, ActiveCategories}
  return (
    <Modal>
      <GroupContainer>
        <GroupHeader>
          <LeftOutlined />
          <div className="group-info">
            <div className="group-category">{}</div>
            <div className="group-name">
              {name} | {location}
            </div>
          </div>
        </GroupHeader>
      </GroupContainer>
    </Modal>
  );
};

export default Group;
