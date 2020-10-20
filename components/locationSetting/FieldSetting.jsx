import React, { useEffect, useCallback, useState } from 'react';
import { Modal, ModalHeader, modalFooter } from '../../public/style';
import { CloseOutlined, ReloadOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import Item from './Item';
import Fields from './Fields';

const FieldForm = styled.form`
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
  height: 190px;

  .choice {
    font-weight: bold;
    height: 140px;
    border-bottom: 1px solid #868686;
  }

  .choice-board {
    display: flex;
    flex-direction: column;
  }

  .choice-board-list {
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

const FieldSetting = ({ setShowingFieldModal, fields, setFields }) => {
  const [fieldsObj, setFieldsObj] = useState({});

  useEffect(() => {
    const newObj = {};
    fields.forEach(field =>
      newObj[field.middleCategory]
        ? newObj[field.middleCategory].push(field.subclass)
        : (newObj[field.middleCategory] = [field.subclass])
    );
    setFieldsObj(newObj);
  }, [fields]);

  const closeFieldModal = useCallback(() => {
    setShowingFieldModal(prev => !prev);
  }, []);
  return (
    <Modal zIndex={2}>
      <FieldForm>
        <ModalHeader>
          <h3>지역 설정</h3>
          <CloseOutlined onClick={closeFieldModal} />
        </ModalHeader>
        <Fields
          fields={fields}
          setFields={setFields}
          setFieldsObj={setFieldsObj}
        />
        <ModalFooter>
          <section className="choice">
            <div>선택한 분야</div>
            {Object.keys(fieldsObj).map(middleCategory => (
              <div className="choice-board">
                <div>{middleCategory} / 중분류</div>
                <div className="choice-board-list">
                  {fieldsObj[middleCategory].map(subclass => (
                    <Item
                      key={subclass}
                      type="field"
                      name={subclass}
                      array={fields}
                      setArray={setFields}
                    />
                  ))}
                </div>
              </div>
            ))}
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
      </FieldForm>
    </Modal>
  );
};

export default FieldSetting;
