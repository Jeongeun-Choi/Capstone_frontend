import React from 'react';
import QnaItem from './QnaItem';

const QnaList = ({ setQnas, groupId, qnas, isMyGroup }) => {
  if (qnas.length === 0) return <div>qna가 없습니다.</div>;

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
