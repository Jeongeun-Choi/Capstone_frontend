import React from 'react';
import CheckBoxLabel from './CheckBoxLabel';
import styled from '@emotion/styled';

const Locations = [
  { id: 'all', location: '전국' },
  { id: 'seoul', location: '서울' },
  { id: 'busan', location: '부산' },
  { id: 'incheon', location: '인천' },
  { id: 'gwangju', location: '광주' },
  { id: 'daegeon', location: '대전' },
  { id: 'ulsan', location: '울산' },
  { id: 'gyeonggi', location: '경기' },
  { id: 'gangwon', location: '강원' },
  { id: 'chungbuk', location: '충북' },
  { id: 'chungnam', location: '충남' },
  { id: 'jeonbuk', location: '전북' },
  { id: 'jeonnam', location: '전남' },
  { id: 'gyeongbuk', location: '경북' },
  { id: 'gyeongnam', location: '경남' },
  { id: 'jeju', location: '제주' },
];

const FilterLocationContainer = styled.div`
  & .column_name {
    font-size: 1.1rem;
    //border: 1px solid red;
  }

  & .location_container{
    //border: 1px solid orange;
    margin: 0.3rem;
  }
`;

const LocationWrapper = styled.section`
  display: grid;
  justify-content: center;
  grid-template-columns: 16% 16% 16% 16% 16% 16%;
  row-gap: 0.2rem;

  @media screen and (min-width: 720px) {
    justify-content: flex-start;
    grid-template-columns: 6% 6% 6% 6% 6% 6%;
  }
`;
const FilterLocation = () => {
  return (
    <FilterLocationContainer>
      <div className='column_name'>활동 지역</div>
      <LocationWrapper className="location_container">
        {Locations.map((location) => (
          <CheckBoxLabel
            key={location.id}
            id={location.id}
            text={location.location}
            width={'2.5rem'}
          ></CheckBoxLabel>
        ))}
      </LocationWrapper>
    </FilterLocationContainer>
  );
};

export default FilterLocation;
