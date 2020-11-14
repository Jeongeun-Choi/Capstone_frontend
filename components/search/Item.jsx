import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { basicBoxStyle } from '../../public/style';
import GroupDetail from '../post/GroupDetail';
import PostDetail from '../post/PostDetail';
import { categoryUrlNames } from '../../utils/categoryNames';

const ItemBox = styled.div`
  ${basicBoxStyle}
  width: 100%;
  height: 35vh;
  margin-top: 1rem;
  cursor: pointer;
  transition: opacity 0.5s;
  //border: 1px solid blue;

  &:hover {
    opacity: 0.8;
  }
  & img {
    width: 100%;
    height: 55%;
    border-radius: 10px;
    margin-bottom: 0.5rem;
  }

  & .box-info {
    display: flex;
    flex-direction: column;

    & .box-info-category,
    .box-info-location {
      font-size: 0.8rem;
      padding-left: 0.5rem;
    }

    & .box-info-name {
      font-size: 1rem;
      font-weight: bold;
      padding-left: 0.5rem;
    }
  }
`;

const Item = ({ type, name, id, location, category, image = null }) => {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  const clickItem = useCallback(() => {
    if (type === 'post') {
      return router.push(`/recruit/${id}`);
    }
    router.push(`/group/${id}`);
  }, []);

  return (
    <>
      <ItemBox onClick={clickItem}>
        <img
          src={(image && image.URL) || `/images/basic_${category}.png`}
          alt={(image && image.description) || '기본 그룹 사진'}
        />
        <div className="box-info">
          <div className="box-info-category">{categoryUrlNames[category]}</div>
          <div className="box-info-name">{name}</div>
          <div className="box-info-location">
            {location
              ?.split(' ')
              .slice(0, 3)
              .join(' ')}
          </div>
        </div>
      </ItemBox>
    </>
  );
};

export default Item;
