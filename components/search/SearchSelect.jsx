import React from 'react';

const SearchSelect = ({ selected, onChangeSelect }) => {
  return (
    <select name='sort' value={selected} onChange={onChangeSelect}>
      <option value='default' disabled hidden>
        정렬방식
      </option>
      <option value='lastest'>최신등록순</option>
      <option value='like'>추천순</option>
      <option value='deadline'>모집마감임박순</option>
    </select>
  );
};

export default SearchSelect;
