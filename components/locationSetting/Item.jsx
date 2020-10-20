import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { CloseOutlined } from '@ant-design/icons';

const ItemBox = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  border-radius: 17.5px;
  border: 1px solid #ffffff;
  background-color: rgba(255, 255, 255, 0);
  color: white;
  > div {
    width: 92%;
    display: flex;
    justify-content: space-between;
  }
  .item-delete {
    border: none;
    background-color: rgba(255, 255, 255, 0);
  }
`;

const Item = ({ type, name, array, setArray }) => {
  const deleteItem = useCallback(
    e => {
      e.preventDefault();
      let index = [];
      if (type === 'location') {
        index = array.findIndex(element => element.bname === name);
      } else {
        index = array.findIndex(element => element.subclass === name);
      }

      setArray([
        ...array.slice(0, index),
        ...array.slice(index + 1, array.length)
      ]);
    },
    [array]
  );

  return (
    <ItemBox>
      <div>
        {name}
        <button className="item-delete" onClick={deleteItem}>
          <CloseOutlined />
        </button>
      </div>
    </ItemBox>
  );
};

export default Item;
