import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { CloseOutlined } from '@ant-design/icons';

const ItemBox = styled.div`
  width: 170px;
  display: flex;
  justify-content: center;
  border-radius: 17.5px;
  border: 1px solid ${props => (props.color ? props.color : '#ffffff')};
  background-color: rgba(255, 255, 255, 0);
  color: ${props => (props.color ? props.color : '#ffffff')};
  margin-right: 5px;
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

const Item = ({ type, name, array, setArray, color }) => {
  const deleteItem = useCallback(
    e => {
      e.preventDefault();
      let index = [];
      if (type === 'location') {
        index = array.findIndex(element => element.bname === name);
      } else {
        index = array.findIndex(element => element.name === name);
      }

      setArray([
        ...array.slice(0, index),
        ...array.slice(index + 1, array.length)
      ]);
    },
    [array]
  );

  return (
    <ItemBox color={color}>
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
