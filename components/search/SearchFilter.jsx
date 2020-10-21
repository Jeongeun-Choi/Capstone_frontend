import React from 'react';
import { Modal, ModalHeader, modalFooter } from '../../public/style';
import { LeftOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import Slider from '@ant-design/react-slick';

const FilterForm = styled.form`
  width: 100%;
  height: 100%;

  & main {
    width: 100%;
    height: 80%;
    margin-top: 10px;

    & section {
      width: 90%;
    }
  }
`;

const SearchFilter = () => {
  return (
    <Modal>
      <FilterForm>
        <ModalHeader>
          <LeftOutlined />
          <h3>검색 조건</h3>
        </ModalHeader>
        <main>
          <section>
            <div className="div-title">정렬 방식</div>
            <div className="div-content">최신등록순</div>
          </section>
          <section>
            <div className="div-title">모집 인원</div>
            <div className="div-content">
              <Slider />
            </div>
          </section>
          <section>
            <div className="div-title">활동 요일</div>
            <div className="div-content"></div>
          </section>
          <section>
            <div className="div-title">활동 지역</div>
            <div className="div-content"></div>
          </section>
        </main>
      </FilterForm>
    </Modal>
  );
};

export default SearchFilter;
