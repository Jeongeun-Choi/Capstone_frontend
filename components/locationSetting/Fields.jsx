import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';

const categorys = {
  스포츠: ['축구', '농구', '야구', '배구', '당구'],
  음악: ['락', '발라드', '밴드', '버스킹'],
  게임: ['리그오브레전드', '서든어택', '오버워치', '오토체스', '쿠키런'],
  프로그래밍: [
    '프론트엔드',
    '백엔드',
    '모바일프로그래밍',
    '데이터분석',
    '게임개발'
  ],
  공모전: ['기획/아이디어', '브랜드/네이밍', '광고/마케팅', '사진/영상'],
  스터디: ['어학', '취업', '자격증'],
  기타: ['요리', '자수', '뜨개질']
};

const FieldsContainer = styled.div`
  width: 100%;
  height: 50%;

  & .field-title {
    display: flex;
    width: 100%;
    height: 35px;
    border-top: 1px solid #c4c4c4;
    border-bottom: 1px solid #c4c4c4;

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

      & li {
        width: 90%;
        height: 14%;
        line-height: 45px;
        text-align: center;
      }
    }
  }
`;

const Fields = ({ fields, setFields, setFieldsObj }) => {
  const [middleCategory, setMiddleCategory] = useState('');
  const [showingSubclass, setShowingSubclass] = useState(false);

  const clickMiddleCategory = useCallback(
    categoryName => () => {
      setMiddleCategory(categoryName);
      setShowingSubclass(true);
    },
    []
  );

  const clickSubclass = useCallback(
    subclass => () => {
      const field = { middleCategory, subclass };
      setFields([field, ...fields]);
    },
    [middleCategory, fields]
  );

  return (
    <FieldsContainer>
      <div className="field-title">
        <div>중분류</div>
        <div>소분류</div>
      </div>
      <div className="field-main">
        <ul className="field-middle-category">
          {Object.keys(categorys).map(categoryName => (
            <li key={categoryName} onClick={clickMiddleCategory(categoryName)}>
              {categoryName}
            </li>
          ))}
        </ul>
        {showingSubclass ? (
          <ul className="field-subclass">
            {categorys[middleCategory].map(subclass => (
              <li key={subclass} onClick={clickSubclass(subclass)}>
                {subclass}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </FieldsContainer>
  );
};

export default Fields;
