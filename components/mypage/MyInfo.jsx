import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import useInputChangeHook from '../../hooks/useInputChangeHook';
import axios from '../../utils/baseAxios';
import { updateMyInfoRequestAction } from '../../reducers/user';
import {
  SettingOutlined,
  LockOutlined,
  CloseOutlined,
  UploadOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import styled from '@emotion/styled';

const MyInfoContainer = styled.section`
  display: flex;
  flex-direction: column;

  & .info_explain {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.7rem;
  }
  & .info_modify_button {
    background-color: white;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }

  & .info_column {
    font-size: 0.9rem;
    color: grey;
    //border: 1px solid red;
    margin-bottom: 1%;
  }

  & .info_content {
    font-size: 0.9rem;
    font-weight: bold;
    //border: 1px solid blue;
  }

  & li {
    margin: 1rem 0;
  }

  & .modify_button {
    position: absolute;
    bottom: 10vh;
    right: 2rem;
    padding: 0.5rem;
    border: none;
    border-radius: 5px;
    background: #6055CD;
    color: white;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  & .modify_image {
    & .image_wrapper {
      display: flex;
    }

    & .image_border {
      display: flex;
    }

    & .button_wrapper {
      display: flex;
      align-items: flex-end;
    }
    & button {
      width: 4rem;
      height: 2rem;
      background: white;
      color: #6055CD;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    & .delete_icon {
      font-size: 12px;
      text-align: right;
      margin-left: 5px;
    }
  }
`;

const MyInfo = ({ myInfo }) => {
  const [isModify, setIsModify] = useState(false);
  const [email, changeEmail, setEmail] = useInputChangeHook(myInfo.email);
  const [telephone, changeTelephone, setTelephone] = useInputChangeHook(
    myInfo.telephone
  );
  const [imageUrl, setImageUrl] = useState(myInfo.profileImg);
  const imageRef = useRef(null);

  const dispatch = useDispatch();

  const changeStatus = () => {
    setIsModify((prev) => !prev);
    setEmail(myInfo.email);
    setTelephone(myInfo.telephone);
    setImageUrl(myInfo.profileImg);
  };

  const modifyInfo = () => {
    dispatch(
      updateMyInfoRequestAction({
        memberId: myInfo.id,
        email,
        telephone,
        profileImg: imageUrl,
      })
    );
    changeStatus();
  };

  const deleteImage = () => {
    setImageUrl(myInfo.profileImg);
  };

  const imageUpload = async (e) => {
    const imageFormData = new FormData();
    imageFormData.append('images', e.target.files[0]);
    try {
      const result = await axios.post('/images', imageFormData);
      const url = result.data.urls[0];

      setImageUrl(url);
    } catch (e) {
      console.error(e);
    }
  };

  const onClickImageUpload = () => {
    imageRef.current.click();
  };

  return (
    <MyInfoContainer>
      <div className='info_explain'>
        <span>
          지원 정보 및 지원 결과 수신이 가능한<br></br>
          이메일, 연락처 정보를 입력해주세요.
        </span>
        <button className='info_modify_button' onClick={changeStatus}>
          <SettingOutlined />
        </button>
      </div>

      <ul>
        <li>
          <div className='info_column'>이름&nbsp; {isModify && <LockOutlined />}</div>
          <div className='info_content'>{myInfo.name}</div>
        </li>
        <li>
          <div className='info_column'>
            생년월일&nbsp; {isModify && <LockOutlined />}
          </div>
          <div className='info_content'>{myInfo.birthday}</div>
        </li>

        <li>
          <div className='info_column'>성별&nbsp; {isModify && <LockOutlined />}</div>
          <div className='info_content'>{myInfo.gender ? '여자' : '남자'}</div>
        </li>
        <li>
          <div className='info_column'>이메일</div>
          {isModify ? (
            <input value={email} onChange={changeEmail}></input>
          ) : (
            <div className='info_content'>{myInfo.email}</div>
          )}
        </li>
        <li>
          <div className='info_column'>휴대전화</div>
          {isModify ? (
            <input value={telephone} onChange={changeTelephone}></input>
          ) : (
            <div className='info_content'>{myInfo.telephone}</div>
          )}
        </li>
        {isModify && (
          <li className='modify_image'>
            <div className='info_column'>프로필 이미지
            <button onClick={onClickImageUpload}>
                  <UploadOutlined />
            </button>
            </div>
            <div className='image_wrapper'>
              <div className='image_border'>
                <img
                  src={imageUrl}
                  alt='프로필 이미지'
                  width='90'
                  height='90'
                />
                <div className='delete_icon' onClick={deleteImage}>
                  <CloseOutlined />
                </div>
              </div>
              <div className='button_wrapper'>
                <input
                  type='file'
                  hidden
                  ref={imageRef}
                  onChange={imageUpload}
                />
              </div>
            </div>
          </li>
        )}
      </ul>
      {isModify && (
        <button className='modify_button' onClick={modifyInfo}>
          <CheckOutlined />
        </button>
      )}
    </MyInfoContainer>
  );
};

export default MyInfo;
