import React, { useCallback, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import useInputChangeHook from '../../hooks/useInputChangeHook';
import { DatePicker, TimePicker, Slider } from 'antd';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import {
  modalFooter,
  ModalHeader,
  basicStyle,
  Modal
} from '../../public/style';
import usePickerHook from '../../hooks/usePickerHook';

const format = 'HH:mm';

const WritingPostContainer = styled.form`
  width: 100%;
  height: 85%;

  & .post-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 94%;
    overflow: auto;

    & .post-item {
      width: 90%;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      display: flex;
      flex-direction: column;
    }
  }
  & .post-input {
    ${basicStyle};
    width: 60%;
    border: none;
  }
  & label,
  .subtitle {
    font-weight: bold;
    margin-right: 5px;
    font-size: 1.1rem;
  }

  & textarea {
    resize: none;
    border: none;
  }
`;

const WritingPostHeader = styled(ModalHeader)`
  color: #ffffff;
  background-color: #aaabd3;

  h3 {
    color: #ffffff;
  }
`;

const WritingPostFooter = styled.button`
  ${modalFooter};
  border: 1px solid #aaabd3;
  background-color: #aaabd3;
  color: #ffffff;
  font-weight: bold;
`;

const WritingPost = ({ setIsShowing, data }) => {
  const [title, changeTitle] = useInputChangeHook('');
  const [contents, changeContents] = useInputChangeHook('');
  const [date, changeDate] = usePickerHook('');
  const [time, changeTime] = usePickerHook('');
  const [expectMemberCount, setExpectMemberCount] = useState(0);
  const dispatch = useDispatch();

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
    async e => {
      e.preventDefault();
      const body = {
        title,
        contents,
        deadline: `${date} ${time}:00`,
        expectMemberCount,
        groupMemberId: data.id
      };
      try {
        dispatch(addPostRequestAction(body));
        setIsShowing(prev => prev);
      } catch (err) {
        console.log(err);
      }
    },
    [title, contents, date, time, expectMemberCount, data]
  );

  return (
    <>
      <Modal>
        <WritingPostHeader>
          <h3>모임글 작성</h3>
          <LeftOutlined onClick={closeModal} />
        </WritingPostHeader>
        <WritingPostContainer>
          <main className="post-content">
            <div className="post-item">
              <label htmlFor="title">제목</label>
              <input
                id="title"
                value={title}
                className="post-input"
                onChange={changeTitle}
                placeholder="제목을 입력해주세요."
              />
            </div>
            <div className="post-item">
              <label htmlFor="content">내용</label>
              <textarea
                id="content"
                required
                value={contents}
                onChange={changeContents}
                placeholder="모집글에 대한 내용을 입력해주세요."
              ></textarea>
            </div>
            <div className="post-item">
              <div className="subtitle">마감 시간</div>
              <div className="post-active-time-content">
                <DatePicker onChange={changeDate} />
                <TimePicker format={format} onChange={changeTime} />
              </div>
            </div>
            <div className="post-item">
              <div className="subtitle">예상 인원</div>
              <Slider
                defaultValue={0}
                max={10}
                tipFormatter={formatter}
                onChange={changeSlider}
              />
            </div>
          </main>
          <WritingPostFooter type="submit" onClick={submitResult}>
            모임 개설하기
          </WritingPostFooter>
        </WritingPostContainer>
      </Modal>
    </>
  );
};

export default WritingPost;
