import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { message } from 'antd';

const FieldsContainer = styled.div`
  width: 100%;
  height: 50%;

  & .field-title {
    display: flex;
    width: 100%;
    height: 35px;
    border-top: 1px solid #c4c4c4;
    border-bottom: 1px solid #c4c4c4;
    padding-top: 0.3rem;

    & div {
      width: 50%;
      height: 100%;
      text-align: center;
    }
  }

  .field-main {
    width: 100%;
    height: 100%;
    display: flex;

    & .field-middle-category {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      list-style: none;
      padding-left: 1rem;

      & li {
        width: 90%;
        height: 14%;
        line-height: 45px;
        text-align: center;
      }
    }

    & .field-subclass {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      list-style: none;
      padding-left: 1rem;

      & li {
        width: 90%;
        height: 14%;
        line-height: 45px;
        text-align: center;
      }
    }
  }
`;

const Fields = ({ tempFields, setTempFields }) => {
  const { categories } = useSelector((state) => state.category);
  const [middleCategory, setMiddleCategory] = useState('');
  const [showingSubclass, setShowingSubclass] = useState(false);

  const clickMiddleCategory = useCallback(
    (categoryName) => () => {
      setMiddleCategory(categoryName);
      setShowingSubclass(true);
    },
    []
  );

  const clickSubclass = useCallback(
    (subclass) => () => {
      if (tempFields.length === 3) {
        return message.error('최대 3개만 입력 됩니다.');
      }
      const { id, name } = subclass;
      const field = { id, name, middleCategory };
      const hasSameField = tempFields.some((field) => field.id === id);
      if (hasSameField) return;
      const newfields = [...tempFields, field];
      setTempFields(newfields);
    },
    [middleCategory, tempFields]
  );

  return (
    <FieldsContainer>
      <div className='field-title'>
        <div>대분류</div>
        <div>소분류</div>
      </div>
      <div className='field-main'>
        <ul className='field-middle-category'>
          {Object.keys(categories).map((categoryName) => (
            <li key={categoryName} onClick={clickMiddleCategory(categoryName)}>
              {categoryName}
            </li>
          ))}
        </ul>
        {showingSubclass && (
          <ul className='field-subclass'>
            {categories[middleCategory].map((subclass) => (
              <li key={subclass.name} onClick={clickSubclass(subclass)}>
                {subclass.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </FieldsContainer>
  );
};

export default Fields;
