import React from 'react';
import styled from '@emotion/styled';
import CheckBoxLabel from './CheckBoxLabel';

const FilterDayContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & .column_name {
    font-size: 1.1rem;
  }
`;

const DayWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  @media screen and (min-width: 780px) {
    justify-content: flex-start;
  }
`;

const FilterDay = ({ setActiveDay }) => {
  return (
    <FilterDayContainer>
      <div className='column_name'>활동 요일</div>
      <DayWrapper>
        <CheckBoxLabel id='monday' text='월' setState={setActiveDay} />
        <CheckBoxLabel id='tuesday' text='화' setState={setActiveDay} />
        <CheckBoxLabel id='wednesday' text='수' setState={setActiveDay} />
        <CheckBoxLabel id='thursday' text='목' setState={setActiveDay} />
        <CheckBoxLabel id='friday' text='금' setState={setActiveDay} />
        <CheckBoxLabel id='saturday' text='토' setState={setActiveDay} />
        <CheckBoxLabel id='sunday' text='일' setState={setActiveDay} />
      </DayWrapper>
    </FilterDayContainer>
  );
};

export default FilterDay;
