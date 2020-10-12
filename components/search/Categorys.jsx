import React from 'react';
import Category from './Category';
import styled from '@emotion/styled';
import { Row, Col } from 'antd';

const categoryNames = {
  programing: '프로그래밍',
  game: '게임',
  sports: '스포츠',
  contest: '공모전',
  study: '스터디',
  music: '음악'
};

const CategorysContainer = styled.div`
  width: 100%;
  /* background-color: blue; */
`;

const Categorys = () => {
  return (
    <CategorysContainer>
      <Row justify="space-around">
        {Object.keys(categoryNames).map(category => (
          <Col key={category} span={9}>
            <Category category={category} name={categoryNames[category]} />
          </Col>
        ))}
      </Row>
    </CategorysContainer>
  );
};

export default Categorys;
