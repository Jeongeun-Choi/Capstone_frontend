import React, { useState } from 'react';
import { Modal, ModalHeader, modalFooter } from '../../public/style';
import { CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import Address from './FindingAddress';
import styled from '@emotion/styled';
import Item from './Item';

const LocationForm = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .form-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-height: 450px;
    max-width: 600px;
    min-width: 270px;
  }
`;

const ModalFooter = styled.footer`
  ${modalFooter}
  color: #ffffff;
  background-color: #cba6c3;
  border: 1px solid #cba6c3;
  height: 120px;

  .choice-location {
    font-weight: bold;
    height: 70px;
    border-bottom: 1px solid #868686;
  }

  .choice-location-board {
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
    background-color: #cba6c3;
    border: 1px solid #cba6c3;
    outline-color: #cba6c3;
    font-weight: bold;
  }

  .reset {
    width: 90px;
  }
`;

const LocationSetting = () => {
  const [locations, setLocations] = useState([]);

  return (
    <Modal>
      <LocationForm>
        <ModalHeader>
          <h3>지역 설정</h3>
          <CloseOutlined />
        </ModalHeader>
        <div className="form-content">
          <div>
            <div className="choice-location">
              선택지역<span>({locations.length}/3)</span>
            </div>
            <div>"찾으시려는 지역의 명칭을 정확하게 입력해주세요."</div>
            <Address locations={locations} setLocations={setLocations} />
          </div>
        </div>
        <ModalFooter>
          <section className="choice-location">
            <div>선택한 지역</div>
            <div className="choice-location-board">
              {locations.map(location => (
                <Item
                  key={location}
                  name={location}
                  locations={locations}
                  setLocations={setLocations}
                />
              ))}
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
      </LocationForm>
    </Modal>
  );
};

export default LocationSetting;