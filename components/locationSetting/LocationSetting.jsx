import React, { useCallback, useState } from 'react';
import { Modal, ModalHeader, modalFooter } from '../../public/style';
import { CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import Address from './FindingAddress';
import styled from '@emotion/styled';
import Item from './Item';

const LocationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: 'Nanum Gothic', sans-serif;

  .form-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-height: 450px;
    max-width: 600px;
    min-width: 270px;

    .select-count {
      //border: 1px solid red;
      margin-bottom: 15%;
      font-size: 7.5px;
    }

    .select-info {
      //border: 1px solid green;
      margin-bottom: 5%;
    }

    .select-examples {
      margin-top: 3%;
      color: #868686;
      font-size: 8px;
    }
  }
`;

const ModalFooter = styled.footer`
  ${modalFooter}
  color: #ffffff;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: #6055cd;
  border: 1px solid #6055cd;
  height: 120px;
  z-index: 3;

  .choice-location {
    height: 70px;
    border-bottom: 1px solid #868686;
    padding: 2% 0 0 2%;
    //font-size: 7.5px;
    font-size: 0.75rem;
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
    background-color: #6055cd;
    border: 1px solid #6055cd;
    outline-color: #6055cd;
    font-weight: bold;
  }
  .reset {
    width: 90px;
    /* border: 1px solid red; */
  }
`;

const LocationSetting = ({
  setShowingLocationModal,
  locations,
  setLocations,
  onSubmit
}) => {
  const [tempLocations, setTempLocations] = useState(locations);

  const closeLocationModal = useCallback(() => {
    setShowingLocationModal(prev => !prev);
    setTempLocations(locations);
  }, [locations]);

  const submitResult = useCallback(
    e => {
      e.preventDefault();
      if (tempLocations.length === 0) {
        return alert('한 개 이상의 지역을 설정해야합니다.');
      }

      setLocations && setLocations(tempLocations);
      onSubmit && onSubmit(tempLocations);
      setTempLocations([]);
      setShowingLocationModal(prev => !prev);
    },
    [tempLocations]
  );

  return (
    <Modal zIndex={3}>
      <LocationContainer>
        <ModalHeader>
          <h3>지역 설정</h3>
          <CloseOutlined onClick={closeLocationModal} />
        </ModalHeader>
        <div className="form-content">
          <div>
            {/* className변경 'choice-location' -> 'select-count' */}
            <div className="select-count">
              선택지역<span>({tempLocations.length}/3)</span>
            </div>
            <div className="select-info">
              "찾으시려는 <b>지역</b>의 <b>명칭</b>을 <b>정확하게</b>{' '}
              입력해주세요."
            </div>
            <Address
              locations={tempLocations}
              setLocations={setTempLocations}
            />
            <div className="select-examples">
              예시 1: <b>대전광역시</b>를 입력하고 싶은 경우, <b>대전</b> 또는{' '}
              <b>대전광역시</b> 입력<br></br>
              예시 2: <b>영등포구</b>를 선택하고 싶은 경우, <b>영등포</b> 또는{' '}
              <b>영등포구</b> 입력<br></br>
              예시 3: <b>남천동</b>을 선택하고 싶은 경우, <b>남천</b> 또는{' '}
              <b>남천동</b> 입력
            </div>
          </div>
        </div>
        <ModalFooter>
          <section className="choice-location">
            <div>선택한 지역</div>
            <div className="choice-location-board">
              {tempLocations.map(location => (
                <Item
                  key={location.bname}
                  type="location"
                  name={location.bname}
                  array={tempLocations}
                  setArray={setTempLocations}
                />
              ))}
            </div>
          </section>
          <section className="footer-buttons">
            <div>
              <button className="reset">
                <ReloadOutlined />
                &nbsp; 초기화
              </button>
              <button className="submit" type="button" onClick={submitResult}>
                적용하기
              </button>
            </div>
          </section>
        </ModalFooter>
      </LocationContainer>
    </Modal>
  );
};

export default LocationSetting;
