import React, { useCallback, useState } from 'react';
import FilterDay from './FilterDay';
import FilterLocation from './FilterLocation';
import SearchSelect from './SearchSelect';
import { Modal, ModalHeader, modalFooter } from '../../public/style';
import { LeftOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Slider } from 'antd';
import { useDispatch } from 'react-redux';
import { loadFilteredGroupsRequestAction } from '../../reducers/group';

const FilterForm = styled.form`
  width: 100%;
  height: 100%;

  & .ant-slider-track {
    background-color: #aaabd3;
    &:hover {
      background-color: #aaabd3;
    }
  }
  & .ant-slider-handle {
    border: 2px solid #aaabd3;
  }
  & .ant-slider-dot-active {
    border-color: #aaabd3;
  }
  & .main_section {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;

    & section {
      width: 100%;
      padding: 0 2rem;
      margin: 1rem 0;
    }

    & .column_title {
      font-size: 1.1rem;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  height: 8vh;
  margin-top: auto;
  color: white;
  background-color: #aaabd3;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: opacity 0.5s;
  &:hover {
    opacity: 0.8;
  }
`;

const marks = {
  0: '미지정',
  9: '이하',
  10: '10명 이상',
};

const SearchFilter = ({ toggleFilter }) => {
  const dispatch = useDispatch();

  const [sortBase, setSortBase] = useState('default');
  const [peopleNumber, setPeopleNumber] = useState(0);
  const [activeDay, setActiveDay] = useState([]);
  const [activeLocation, setActiveLocation] = useState([]);

  const onChange = useCallback((value) => {
    setPeopleNumber(value);
  }, []);

  const onChangeSelect = (e) => {
    setSortBase(e.target.value);
  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        loadFilteredGroupsRequestAction({
          sortBase,
          peopleNumber,
          activeDay,
          activeLocation,
        })
      );
      toggleFilter();
    },
    [sortBase, peopleNumber, activeDay, activeLocation]
  );

  return (
    <Modal>
      <FilterForm onSubmit={onSubmit}>
        <ModalHeader>
          <span onClick={toggleFilter}>
            <LeftOutlined />
          </span>
          <h3>검색 조건</h3>
        </ModalHeader>
        <section className='main_section'>
          <section>
            <SearchSelect sortBase={sortBase} onChangeSelect={onChangeSelect} />
          </section>
          <section>
            <div className='column_title'>모집 인원</div>
            <div className='div_content'>
              <Slider
                min={0}
                max={10}
                marks={marks}
                onChange={onChange}
                value={peopleNumber}
              />
            </div>
          </section>
          <FilterDay setActiveDay={setActiveDay} />
          <FilterLocation setActiveLocation={setActiveLocation} />
          <Button>검 색</Button>
        </section>
      </FilterForm>
    </Modal>
  );
};

export default SearchFilter;
