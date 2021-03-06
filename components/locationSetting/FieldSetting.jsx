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
  background-color: #6055cd;
  border: 1px solid #6055cd;
  height: 190px;
  z-index: 3;
  .choice {
    height: 140px;
    border-bottom: 1px solid #868686;
    padding: 2% 0 0 2%;
    font-size: 0.75rem;

    .choice-middleCategory {
      font-size: 0.5rem;
    }
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
    background-color: #6055cd;
    border: 1px solid #6055cd;
    outline-color: #6055cd;
    font-weight: bold;
  }

  .reset {
    width: 90px;
  }
`;

const FieldSetting = ({
  setShowingFieldModal,
  fields,
  setFields,
  onSubmit,
}) => {
  const [fieldsObj, setFieldsObj] = useState({});
  const [tempFields, setTempFields] = useState(fields);

  useEffect(() => {
    const newObj = {};
    tempFields.forEach((field) =>
      newObj[field.middleCategory]
        ? newObj[field.middleCategory].push({ id: field.id, name: field.name })
        : (newObj[field.middleCategory] = [{ id: field.id, name: field.name }])
    );
    setFieldsObj(newObj);
  }, [tempFields]);

  const closeFieldModal = useCallback(() => {
    setShowingFieldModal((prev) => !prev);
    setTempFields(fields);
  }, []);

  const submitResult = useCallback(
    (e) => {
      e.preventDefault();
      if (tempFields.length === 0) {
        return alert('한 개 이상의 관심 분야를 선택해야합니다.');
      }

      setFields && setFields(tempFields);
      onSubmit && onSubmit(tempFields);
      setTempFields([]);
      setShowingFieldModal((prev) => !prev);
    },
    [tempFields]
  );

  return (
    <Modal zIndex={3}>
      <FieldForm>
        <ModalHeader>
          <h3>관심 분야 설정</h3>
          <CloseOutlined onClick={closeFieldModal} />
        </ModalHeader>
        <Fields tempFields={tempFields} setTempFields={setTempFields} />
        <ModalFooter>
          <section className='choice'>
            <div>선택한 분야</div>
            {Object.keys(fieldsObj).map((middleCategory) => (
              <div key={middleCategory} className='choice-board'>
                <div className='choice-middleCategory'>
                  {middleCategory} / 대분류
                </div>
                <div className='choice-board-list'>
                  {fieldsObj[middleCategory].map((subclass) => (
                    <Item
                      key={subclass.name}
                      type='field'
                      name={subclass.name}
                      array={tempFields}
                      setArray={setTempFields}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
          <section className='footer-buttons'>
            <div>
              <button className='reset'>
                <ReloadOutlined />
                &nbsp; 초기화
              </button>
              {/* TODO: onSubmit함수, action 보내기 */}
              <button className='submit' type='button' onClick={submitResult}>
                적용하기
              </button>
            </div>
          </section>
        </ModalFooter>
      </FieldForm>
    </Modal>
  );
};

export default FieldSetting;
