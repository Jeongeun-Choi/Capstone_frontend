import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import FieldSetting from '../locationSetting/FieldSetting';
import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { addCategoryRequestAction } from '../../reducers/user';

const CategoryContainer = styled.section`
  display: flex;
  flex-direction: column;
  & .category_explain {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.7rem;
  }
  & .category_button {
    background-color: white;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }

  & .category_list {
    margin-top: 1rem;
  }
  & .category_item {
    padding: 1rem 0;
  }

  & .category_column,
  & .category_name {
    font-weight: bold;
  }

  & .category_name {
    font-size: 1.2rem;
  }
`;

const PreferCategory = ({ myInfo }) => {
  const dispatch = useDispatch();

  const [isModify, setIsModify] = useState(false);
  const changeStatus = () => {
    setIsModify((prev) => !prev);
  };

  const onSubmit = (categories) => {
    dispatch(
      addCategoryRequestAction({
        memberId: myInfo.id,
        categories,
      })
    );
  };

  return (
    <>
      <CategoryContainer>
        <div className='category_explain'>
          등록된 관심분야의 인기모임을 놓치지 않도록<br></br>
          홈 화면에서 보여드릴게요.
          <button className='category_button' onClick={changeStatus}>
            <SettingOutlined />
          </button>
        </div>
        {myInfo?.PreferCategories?.length && (
          <ul className='category_list'>
            {myInfo.PreferCategories?.map(({ DetailCategory }, index) => (
              <li key={DetailCategory.id} className='category_item'>
                <div>
                  <span className='category_column'>관심분야{index + 1}</span> /{' '}
                  {DetailCategory.Category.type}
                </div>
                <div className='category_name'>{DetailCategory.name}</div>
              </li>
            ))}
          </ul>
        )}
      </CategoryContainer>
      {isModify && (
        <FieldSetting
          setShowingFieldModal={setIsModify}
          fields={myInfo.PreferCategories?.map((category) => {
            return {
              id: category.DetailCategory.id,
              name: category.DetailCategory.name,
              middleCategory: category.DetailCategory.Category.type,
            };
          })}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default PreferCategory;
