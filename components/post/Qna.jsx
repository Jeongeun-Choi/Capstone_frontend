import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import QnaInput from './QnaInput';
import QnaList from './QnaList';
import customAxios from '../../utils/baseAxios';

const QnaContainer = styled.section``;

const Qna = ({ groupId, isMyGroup }) => {
  const [qnas, setQnas] = useState([]);

  const getQnas = async () => {
    const response = await customAxios.get(`/qna/${groupId}`);
    setQnas(response.data.qnas);
  };

  useEffect(() => {
    getQnas();
  }, []);

  return (
    <QnaContainer>
      <QnaInput groupId={groupId} setQnas={setQnas} type='q' />
      <QnaList
        groupId={groupId}
        setQnas={setQnas}
        qnas={qnas}
        isMyGroup={isMyGroup}
      />
    </QnaContainer>
  );
};

export default Qna;
