import React from 'react';
import useInputChangeHook from '../../hooks/useInputChangeHook';
import styled from '@emotion/styled';
import customAxios from '../../utils/baseAxios';
import { useSelector } from 'react-redux';
import useCheckResult from '../../hooks/useCheckResult';

const QnaInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0.5rem;

  & .qna_inputs {
    display: flex;
    flex-direction: column;
    width: 65%;
    & input {
      width: 100%;
      height: 1.5rem;
      margin-bottom: 0.3rem;
    }
    & .qna_title {
      border: none;
      font-weight: bold;
      padding: 0 0.2rem;
    }
    & .qna_contents {
      border: none;
      padding: 0 0.2rem;
    }
    & input:hover {
      outline: 1px solid #6055cd;
    }
  }

  & .qna_buttons {
    & button {
      display: inline-block;
      width: 3rem;
      height: 3rem;
      line-height: 1.3rem;
      border: 1px solid black;
      border-radius: 5px;
      margin-left: 0.2rem;
      font-size: 0.6rem;
      text-align: center;
      background: #f6f6f6;
      color: #b0b0b0;
      cursor: pointer;

      &:hover {
        background-color: #6055cd;
        color: white;
      }
    }
  }
`;

const QnaInput = ({ groupId, setQnas, type, topQnaId }) => {
  const { me } = useSelector((state) => state.user);
  const [title, changeTitle, setTitle] = useInputChangeHook('');
  const [contents, changeContents, setContents] = useInputChangeHook('');
  const [toogle, Screen] = useCheckResult({
    title: 'Q&A',
    content:
      type === 'q'
        ? '질문 등록이 완료 되었습니다.'
        : '답변 등록이 완료 되었습니다.',
  });
  const createQna = async (isSecret) => {
    if (!me.id) return alert('로그인 후에 이용 가능합니다.');

    if (!title.trim() || !contents.trim())
      return alert('제목과 내용을 채워주세요.');

    const response = await customAxios.post('/qna', {
      title,
      contents,
      type,
      topQnaId,
      isSecret,
      groupId,
      memberId: me.id,
    });
    type === 'q'
      ? setQnas((prev) => [
          ...prev,
          {
            ...response.data.qna,
            Reply: {},
            Member: { id: me.id, name: me.name, email: me.email },
          },
        ])
      : setQnas((prev) =>
          prev.map((qna) =>
            qna.id === topQnaId ? { ...qna, Reply: response.data.qna } : qna
          )
        );

    setTitle('');
    setContents('');
    toogle();
  };

  return (
    <QnaInputWrapper>
      <div className='qna_inputs'>
        <input
          className='qna_title'
          placeholder={
            type === 'q'
              ? '문의 제목을 입력해주세요.'
              : '답변 제목을 입력해주세요'
          }
          value={title}
          onChange={changeTitle}
        />
        <input
          className='qna_contents'
          placeholder={
            type === 'r'
              ? '문의 내용을 입력해주세요.'
              : '답변 내용을 입력해주세요.'
          }
          value={contents}
          onChange={changeContents}
        />
      </div>

      <div className='qna_buttons'>
        <button onClick={() => createQna(true)}>
          비밀글로
          <br />
          등록 하기
        </button>
        <button onClick={() => createQna(false)}>
          공개글로
          <br />
          등록 하기
        </button>
      </div>
      <Screen />
    </QnaInputWrapper>
  );
};

export default QnaInput;
