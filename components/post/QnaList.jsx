import React from 'react';
import QnaItem from './QnaItem';
import styled from '@emotion/styled';

const NoQna = styled.div`
  text-align: center;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  color: #868686;
`

const QnaList = ({ setQnas, groupId, qnas, isMyGroup }) => {
  if (qnas.length === 0) return <NoQna>등록된 Q&A가 없습니다.</NoQna>;

  return (
    <ul>
      {qnas.map((qna) => (
        <QnaItem
          key={qna.id}
          qna={qna}
          isMyGroup={isMyGroup}
          setQnas={setQnas}
          groupId={groupId}
        />
      ))}
    </ul>
  );
};

export default QnaList;
