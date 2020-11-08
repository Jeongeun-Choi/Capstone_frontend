import React from 'react';
import styled from '@emotion/styled';

const ModalFooter = styled.footer`
  ${modalFooter}
  font-family: 'Nanum Gothic', sans-serif;
  color: #ffffff;
  background-color: #6055CD;
  border: 1px solid #6055CD;
  height: 120px;

  .choice {
    font-weight: bold;
    height: 70px;
    border-bottom: 1px solid #868686;
    font-size: 0.8rem;
  }

  .choice-board {
    display: flex;
  }
  .footer-buttons {
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  button {
    background-color: #6055CD;
    border: 1px solid#6055CD;
    outline-color: #6055CD;
    font-weight: bold;
  }

  .reset {
    width: 90px;
  }
`;

const ChoiceModalFooter = ({ type, items, setItems }) => {
  return (
    <ModalFooter type={type}>
      <section className="choice">
        {type === 'location' ? <div>선택한 지역</div> : <div>선택한 분야</div>}
        <div className="choice-board">
          {type === 'location'
            ? items.map(location => (
                <Item
                  key={location}
                  name={location.bname}
                  locations={items}
                  setLocations={setItems}
                />
              ))
            : items.map(field => {
                <Item key={field} />;
              })}
        </div>
      </section>
      <section className="footer-buttons">
        <div>
          <button className="reset">
            <ReloadOutlined />
            초기화
          </button>
          {/* TODO: onSubmit함수, action 보내기 */}
          <button className="submit">적용하기</button>
        </div>
      </section>
    </ModalFooter>
  );
};

export default ChoiceModalFooter;
