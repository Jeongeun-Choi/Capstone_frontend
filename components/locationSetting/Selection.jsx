import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import LocationSetting from './LocationSetting';
import FieldSetting from './FieldSetting';
import Item from './Item';
import {
  addLocationRequestAction,
  addCategoryRequestAction
} from '../../reducers/user';

import styled from '@emotion/styled';
import { Modal, ModalHeader, modalFooter } from '../../public/style';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

const SelectionForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .setting {
    padding-bottom: 4rem;
    width: 90%;
    margin-left: 5%;
    //border: 1px solid blue;

    .section-header {
    display: flex;
    align-items: center;
    //border: 1px solid red;
    }

    .section-main{
      margin-top: 0.3rem;
      font-size: 1rem;
      font-weight: bold;
    }
  }

  .choice-board {
    color: #6055cd;

    & .choice-board-list {
      display: flex;
    }
  }
`;

const Footer = styled.button`
  ${modalFooter}
  color: #ffffff;
  background-color: #6055cd;
  border: 1px solid #6055cd;
  font-weight: bold;
`;

const Selection = ({ setShowingModal }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const [locations, setLocations] = useState([]);
  const [fields, setFields] = useState([]);
  const [fieldsObj, setFieldsObj] = useState({});
  const [showingLocationModal, setShowingLocationModal] = useState(false);
  const [showingFieldModal, setShowingFieldModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const newObj = {};
    fields.forEach(field =>
      newObj[field.middleCategory]
        ? newObj[field.middleCategory].push({ id: field.id, name: field.name })
        : (newObj[field.middleCategory] = [{ id: field.id, name: field.name }])
    );
    setFieldsObj(newObj);
  }, [fields]);

  const showLocationModal = useCallback(() => {
    setShowingLocationModal(prev => !prev);
  }, []);

  const showFieldModal = useCallback(() => {
    setShowingFieldModal(prev => !prev);
  }, []);

  const submitResult = useCallback(
    e => {
      e.preventDefault();
      const memberId = me.id;
      try {
        dispatch(addLocationRequestAction({ memberId, locations }));
        dispatch(addCategoryRequestAction({ memberId, categories: fields }));
        router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    [locations, fields]
  );

  const closeModal = useCallback(() => {
    setShowingModal(prev => !prev);
  }, []);

  return (
    <>
      <SelectionForm>
        <ModalHeader>
          <LeftOutlined onClick={closeModal} />
          <h3>지역 및 관심분야 설정</h3>
        </ModalHeader>
        <section className="setting">
          <div className="section-header">
            <div>활동 선호 지역 설정 ({locations.length}/3)</div>
            &nbsp; 
            <RightOutlined onClick={showLocationModal} />
          </div>
          <div className="section-main">
            {locations.map(location => (
              <Item
                key={location.bname}
                type="location"
                name={location.bname}
                array={locations}
                setArray={setLocations}
                color="#6055CD"
              />
            ))}
          </div>
        </section>
        <Divider />
        <section className="setting">
          <div className="section-header">
            <div>관심 분야 설정 ({fields.length}/3)</div>
            &nbsp; 
            <RightOutlined onClick={showFieldModal} />
          </div>
          <div className="section-main">
            {Object.keys(fieldsObj).map(middleCategory => (
              <div key={middleCategory} className="choice-board">
                <div>{middleCategory} / 중분류</div>
                <div className="choice-board-list">
                  {fieldsObj[middleCategory].map(subclass => (
                    <Item
                      key={subclass.name}
                      type="field"
                      name={subclass.name}
                      array={fields}
                      setArray={setFields}
                      color="#6055CD"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <Footer onClick={submitResult}>설정하기</Footer>
      </SelectionForm>
      {showingLocationModal && (
        <LocationSetting
          setShowingLocationModal={setShowingLocationModal}
          locations={locations}
          setLocations={setLocations}
        />
      )}
      {showingFieldModal && (
        <FieldSetting
          setShowingFieldModal={setShowingFieldModal}
          fields={fields}
          setFields={setFields}
        />
      )}
    </>
  );
};

export default Selection;
