import React from 'react';
import styled from '@emotion/styled';
import CheckBoxLabel from './CheckBoxLabel';

const FilterDayContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & .column_name {
    font-size: 1.1rem;
    //border: 1px solid green;
  }

  & .day_of_week{
    //border: 1px solid pink;
    margin: 0.3rem;
  }
`;

const DayWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (min-width: 780px) {
    justify-content: flex-start;
  }
`;

const FilterDay = () => {
  return (
    <FilterDayContainer>
      <div className='column_name'>활동 요일</div>
      <DayWrapper className='day_of_week'>
        <CheckBoxLabel id='monday' text='월' />
        <CheckBoxLabel id='tuesday' text='화' />
        <CheckBoxLabel id='wednesday' text='수' />
        <CheckBoxLabel id='thursday' text='목' />
        <CheckBoxLabel id='friday' text='금' />
        <CheckBoxLabel id='saturday' text='토' />
        <CheckBoxLabel id='sunday' text='일' />
      </DayWrapper>
    </FilterDayContainer>
  );
};

export default FilterDay;
