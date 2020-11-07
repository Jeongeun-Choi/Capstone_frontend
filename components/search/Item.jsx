import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { basicBoxStyle } from '../../public/style';
import GroupDetail from '../post/GroupDetail';
import PostDetail from '../post/PostDetail';
import { categoryUrlNames } from '../../utils/categoryNames';

const ItemBox = styled.div`
  ${basicBoxStyle}
  max-height: 180px;
  max-width: 500px;
  margin-right: 15px;
  margin-bottom: 20px;
  border: none;

  & img {
    width: 100%;
    height: 100%;
  }

  & .box-info {
    display: flex;
    flex-direction: column;

    & .box-info-category {
      font-size: 0.9rem;
    }

    & .box-info-name {
      font-size: 1rem;
    }

    & .box-info-location {
      font-size: 0.8rem;
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
          src={(image && image.URL) || '/images/teamimg.jpg'}
          alt={(image && image.description) || '기본 그룹 사진'}
        />
        <div className="box-info">
          <div className="box-info-category">{categoryUrlNames[category]}</div>
          <div className="box-info-name">{name}</div>
          <div className="box-info-location">{location}</div>
        </div>
      </ItemBox>
    </>
  );
};

export default Item;
