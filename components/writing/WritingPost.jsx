import React, { useCallback, useState, useEffect } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import useInputChangeHook from '../../hooks/useInputChangeHook';
import { DatePicker, TimePicker, Slider } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import {
  modalFooter,
  ModalHeader,
  basicStyle,
  Modal
} from '../../public/style';
import usePickerHook from '../../hooks/usePickerHook';
import {
  addPostRequestAction,
  updatePostRequestAction
} from '../../reducers/post';
import customAxios from '../../utils/baseAxios';

const WritingPostContainer = styled.form`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;

  & .post-content {
    justify-content: space-around;
    align-items: center;
    height: 100%;
    overflow: auto;
    margin-left: 1rem;

    & .post-item {
      width: 90%;
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      //border: 1px solid red;

      & label,
      .subtitle {
        font-weight: bold;
        margin-right: 5px;
        font-size: 1rem;
        //border: 1px solid blue;
      }

      & .post-input {
        ${basicStyle};
        width: 60%;
        border: none;
      }

      & textarea {
        resize: none;
        border: none;
      }
    }
  }
`;

const WritingPostHeader = styled(ModalHeader)`
  color: black;
  background-color: #ffffff;

  h3 {
    color: black;
  }
`;

const WritingPostFooter = styled.button`
  ${modalFooter};
  border: 1px solid #6055cd;
  background-color: #6055cd;
  color: #ffffff;
  font-weight: bold;
`;

const WritingPost = ({ setIsShowing, id, type }) => {
  const format = 'HH:mm';
  const modify = type === 'postEdit' ? true : false;
  const [recruit, setRecruit] = useState(null);
  const [title, changeTitle] = useInputChangeHook('');
  const [contents, changeContents] = useInputChangeHook('');
  const [date, changeDate, setDate] = usePickerHook('');
  const [time, changeTime, setTime] = usePickerHook('');
  const [expectMemberCount, setExpectMemberCount] = useState(0);

  console.log(date, time);
  const dispatch = useDispatch();

  useEffect(() => {
    modify && getData();
  }, []);

  const getData = async () => {
    const { data } = await customAxios.get(`/recruits/${id}`);
    setRecruit(data.recruit);
    const [getDate, getTime] =
      data.recruit && data.recruit?.deadline.split(' ');
    setDate(getDate);
    setTime(getTime);
  };

  const formatter = value => {
    return `${value}명`;
  };

  const changeSlider = useCallback(value => {
    setExpectMemberCount(value);
  }, []);

  const closeModal = useCallback(() => {
    setIsShowing(prev => !prev);
  }, []);

  const submitResult = useCallback(
    e => {
      e.preventDefault();
      const body = {
        title,
        contents,
        deadline: `${date} ${time}:00`,
        expectMemberCount
      };
      try {
        if (modify) {
          body.recruitId = recruit.id;
          dispatch(updatePostRequestAction(body));
        } else {
          body.groupMemberId = id;
          dispatch(addPostRequestAction(body));
        }
        setIsShowing(prev => !prev);
      } catch (err) {
        console.log(err);
      }
    },
    [title, contents, date, time, expectMemberCount, recruit]
  );

  return (
    <>
      <Modal>
        <WritingPostHeader>
          <h3>{modify ? '모집글 수정' : '모집글 작성'}</h3>
          <LeftOutlined onClick={closeModal} />
        </WritingPostHeader>
        <WritingPostContainer>
          <main className="post-content">
            <div className="post-item">
              <label htmlFor="title">✦ 제목</label>
              <input
                id="title"
                value={recruit ? recruit.title : title}
                className="post-input"
                onChange={changeTitle}
                placeholder="제목을 입력해주세요."
              />
            </div>
            <div className="post-item">
              <label htmlFor="content">✦ 내용</label>
              <textarea
                id="content"
                required
                value={recruit ? recruit.contents : contents}
                onChange={changeContents}
                placeholder="모집글에 대한 내용을 입력해주세요."
              ></textarea>
            </div>
            <div className="post-item">
              <div className="subtitle">✦ 마감 시간</div>
              <div className="post-active-time-content">
                <DatePicker
                  defaultValue={recruit && moment(date, 'YYYY-MM-DD')}
                  onChange={changeDate}
                />
                <TimePicker
                  defaultValue={recruit && moment(time, format)}
                  format={format}
                  onChange={changeTime}
                />
              </div>
            </div>
            <div className="post-item">
              <div className="subtitle">✦ 예상 인원</div>
              <Slider
                defaultValue={
                  recruit ? recruit.expectMemberCount : expectMemberCount
                }
                max={10}
                tipFormatter={formatter}
                onChange={changeSlider}
              />
            </div>
          </main>
          <WritingPostFooter type="submit" onClick={submitResult}>
            {modify ? '모집글 수정하기' : '모집글 작성하기'}
          </WritingPostFooter>
        </WritingPostContainer>
      </Modal>
    </>
  );
};

export default WritingPost;
