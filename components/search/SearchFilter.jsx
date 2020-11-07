import React, { useCallback, useState } from 'react';
import FilterDay from './FilterDay';
import FilterLocation from './FilterLocation';
import SearchSelect from './SearchSelect';
import { Modal, ModalHeader, modalFooter } from '../../public/style';
import { LeftOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Slider } from 'antd';

const FilterForm = styled.form`
  width: 100%;
  height: 100%;

  & .main_section {
    width: 100%;
    height: 75%;
    margin-top: 10px;
    padding: 0 2rem;

    & section {
      width: 100%;
      margin-bottom: 2rem;
    }

    & .column_title {
      font-size: 1.1rem;
    }
  }
`;

const Button = styled.button`
  width: 100%;
  height: 8vh;
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
  const [sortBase, setSortBase] = useState('');
  const [inputValue, setInputValue] = useState(0);
  const [activeDay, setActiveDay] = useState([]);
  const [activeLocation, setActiveLocation] = useState([]);
  const [selected, setSelected] = useState('default');
  const onChange = useCallback((value) => {
    setInputValue(value);
  }, []);

  const onChangeSelect = (value) => {
    setSelected(value);
  };
  return (
    <Modal>
      <FilterForm>
        <ModalHeader>
          <span onClick={toggleFilter}>
            <LeftOutlined />
          </span>
          <h3>검색 조건</h3>
        </ModalHeader>
        <section className='main_section'>
          <section>
            <SearchSelect selected={selected} onChangeSelect={onChangeSelect} />
          </section>
          <section>
            <div className='column_title'>모집 인원</div>
            <div className='div_content'>
              <Slider
                min={0}
                max={10}
                marks={marks}
                onChange={onChange}
                value={inputValue}
              />
            </div>
          </section>
          <FilterDay />
          <FilterLocation />
        </section>
        <Button>검 색</Button>
      </FilterForm>
    </Modal>
  );
};

export default SearchFilter;
