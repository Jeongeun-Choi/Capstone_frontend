import React, { useState } from 'react';
import styled from '@emotion/styled';
import QnaWrapper from './QnaWrapper';
import QnaInput from './QnaInput';

const QnaItemWrapper = styled.li`
  display: flex;
  flex-direction: column;
  & .qna_noreply {
    width: 100%;
    display: flex;
    justify-content: space-between;

    & button {
      border-radius: 5px;
      padding: 0.2rem;
      color: white;
      background: #6055cd;
      cursor: pointer;
      transition: opacity 1s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
const QnaBox = styled.div`
  width: 80%;
  border-radius: 5px;
  margin-top: 0.5rem;
  margin-right: ${(props) => (props.type === 'q' ? 'auto' : 0)};
  margin-left: ${(props) => (props.type === 'r' ? 'auto' : 0)};
  padding: 0.5rem;
  background: ${(props) => (props.type === 'q' ? '#f6f6f6' : '#fef6dd')};
  & .qna_header {
    display: flex;
    justify-content: space-between;
    & .qna_title {
      font-size: 1rem;
      font-weight: bold;
    }
  }
  & .qna_contents {
    font-size: 0.8rem;
  }
`;
const QnaItem = ({ groupId, setQnas, qna, isMyGroup }) => {
  const [replyStatus, setReplyStatus] = useState(false);

  const onToggle = () => {
    setReplyStatus((prev) => !prev);
  };
  return (
    <QnaItemWrapper key={qna.id}>
      <QnaBox type='q'>
        <QnaWrapper qna={qna} />
      </QnaBox>
      {qna?.Reply?.id ? (
        <QnaBox type='r'>
          <QnaWrapper qna={qna.Reply} />
        </QnaBox>
      ) : (
        <>
          <div className='qna_noreply'>
            아직 답변이 달리지 않았어요!
            {isMyGroup && <button onClick={onToggle}>답변 달기</button>}
          </div>
          {isMyGroup && replyStatus && (
            <QnaInput
              type='r'
              topQnaId={qna.id}
              groupId={groupId}
              setQnas={setQnas}
            ></QnaInput>
          )}
        </>
      )}
    </QnaItemWrapper>
  );
};

export default QnaItem;
