import React from 'react';

const createSecretName = (name) => {
  return name.split('').reduce((total, value, index) => {
    if (index === 0 || index === name.length - 1) return `${total}${value}`;
    return `${total}*`;
  }, '');
};

const QnaWrapper = ({ qna, isSecret }) => {
  return (
    <>
      <div className='qna_header'>
        <span className='qna_title'>{qna.title}</span>
        {qna.Member && <span>{createSecretName(qna.Member.name)}</span>}
      </div>
      <div className='qna_contents'>
        {isSecret ? '비밀 글입니다' : qna.contents}
      </div>
    </>
  );
};

export default QnaWrapper;
