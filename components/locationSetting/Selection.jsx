import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'antd';
import { Modal, ModalHeader, modalFooter } from '../../public/style';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import LocationSetting from './LocationSetting';
import FieldSetting from './FieldSetting';
import Item from './Item';
import {
  addLocationRequestAction,
  addCategoryRequestAction
} from '../../reducers/user';

const SelectionForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .section-header {
    display: flex;
  }
  .setting {
    width: 90%;
    height: 90px;
  }

  .choice-board {
    color: #cba6c3;

    & .choice-board-list {
      display: flex;
    }
  }
`;

const Footer = styled.button`
  ${modalFooter}
  color: #ffffff;
  background-color: #cba6c3;
  border: 1px solid #cba6c3;
  font-weight: bold;
`;

const Selection = ({ setShowingSelection, setShowingInitialLocation }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);
  const [locations, setLocations] = useState([]);
  const [fields, setFields] = useState([]);
  const [fieldsObj, setFieldsObj] = useState({});
  const [showingLocationModal, setShowingLocationModal] = useState(false);
  const [showingFieldModal, setShowingFieldModal] = useState(false);

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
  });

  const showFieldModal = useCallback(() => {
    setShowingFieldModal(prev => !prev);
  });

  const submitResult = useCallback(
    e => {
      e.preventDefault();
      const memberId = me.id;
      try {
        dispatch(addLocationRequestAction({ memberId, locations }));
        dispatch(addCategoryRequestAction({ memberId, categories: fields }));
        // setShowingInitialLocation(prev => !prev);
        // setShowingSelection(prev => !prev);
      } catch (err) {
        console.log(err);
      }
    },
    [locations, fields]
  );

  const closeModal = useCallback(() => {
    setShowingSelection(prev => !prev);
  }, []);

  return (
    <>
      <Modal zIndex={2}>
        <SelectionForm onSubmit={submitResult}>
          <ModalHeader>
            <LeftOutlined onClick={closeModal} />
            <h3>지역 및 관심분야 설정</h3>
          </ModalHeader>
          <section className="setting">
            <div className="section-header">
              <div>활동 선호 지역 설정 ({locations.length}/3)</div>
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
                  color="#CBA6C3"
                />
              ))}
            </div>
          </section>
          <Divider />
          <section className="setting">
            <div className="section-header">
              <div>관심 분야 설정 ({fields.length}/3)</div>
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
                        color="#CBA6C3"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <Footer htmlType="submit">설정하기</Footer>
        </SelectionForm>
      </Modal>
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
