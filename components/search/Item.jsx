import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { basicBoxStyle } from '../../public/style';
import GroupDetail from '../post/GroupDetail';
import PostDetail from '../post/PostDetail';
import customAxios from '../../utils/baseAxios';
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

const Item = ({ type, name, id, location, category, image }) => {
  const [isShowing, setIsShowing] = useState(false);
  const [data, setData] = useState(null);

  const clickItem = useCallback(async () => {
    if (type === 'post') {
      const response = await customAxios.get(`/recruits/${id}`);
      setData(response.data.recruit);
    } else {
      const response = await customAxios.get(`/groups/${id}`);
      setData(response.data.group);
    }
    setIsShowing(prev => !prev);
  }, [id]);

  console.log(type);
  return (
    <>
      <ItemBox onClick={clickItem}>
        <img src={image.URL} alt={image.description} />
        <div className="box-info">
          <div className="box-info-category">{categoryUrlNames[category]}</div>
          <div className="box-info-name">{name}</div>
          <div className="box-info-location">{location}</div>
        </div>
      </ItemBox>
      {type === 'post'
        ? isShowing && <PostDetail data={data} setIsShowing={setIsShowing} />
        : isShowing && <GroupDetail data={data} setIsShowing={setIsShowing} />}
    </>
  );
};

export default Item;
