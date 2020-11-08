import React, { useEffect, useState, useCallback, useRef } from 'react';
import Header from '../main/Header';
import FixedButton from './FixedButton';
import SearchFilter from './SearchFilter';

import { Input, Select } from 'antd';
import { basicStyle } from '../../public/style';
import styled from '@emotion/styled';
import { categoryUrlNames } from '../../utils/categoryNames';
import useInputChangeHook from '../../hooks/useInputChangeHook';
import { loadFilteredGroupsRequestAction } from '../../reducers/group';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import GroupList from '../main/GroupList';
import PostList from './PostList';
import { loadPostsRequestAction } from '../../reducers/post';

const { Option } = Select;
const { Search } = Input;
const SearchInput = styled(Search)`
  ${basicStyle}
  width: 90%;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchMain = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { groups } = useSelector((state) => state.group);
  const { posts } = useSelector((state) => state.post);
  const { category } = useSelector((state) => state.category);
  const containerRef = useRef(null);

  const categoryName = router.query.category;
  const [isGroup, setIsGroup] = useState(true);
  const [inputValue, onChangeInputValue, setInputValue] = useInputChangeHook();
  const [isShowFilter, setIsShowFilter] = useState(false);
  const toggleFilter = useCallback(() => {
    setIsShowFilter((prev) => !prev);
    containerRef.current.style.overflowY =
      containerRef.current.style.overflowY === 'hidden' ? 'auto' : 'hidden';
  }, []);

  const [sortBase, setSortBase] = useState('default');
  const [peopleNumber, setPeopleNumber] = useState(0);
  const [activeDay, setActiveDay] = useState([]);
  const [activeLocation, setActiveLocation] = useState([]);

  const onPressInput = () => {
    if (isGroup) {
      console.log(
        sortBase,
        peopleNumber,
        activeDay,
        activeLocation,
        inputValue,
        categoryName
      );
      dispatch(
        loadFilteredGroupsRequestAction({
          sortBase: sortBase === 'default' ? '' : sortBase,
          peopleNumber,
          activeDay,
          activeLocation,
          groupName: inputValue,
          category: categoryUrlNames[categoryName],
        })
      );
    } else {
      const categoryId = category?.filter(
        (item) => item.type === categoryUrlNames[categoryName]
      )[0].id;
      dispatch(loadPostsRequestAction({ categoryId, recruitName: inputValue }));
    }

    setSortBase('default');
    setPeopleNumber(0);
    setActiveDay([]);
    setActiveLocation([]);
    setInputValue('');
  };

  useEffect(() => {
    if (isGroup) {
      dispatch(
        loadFilteredGroupsRequestAction({
          sortBase: sortBase === 'default' ? '' : sortBase,
          peopleNumber,
          activeDay,
          activeLocation,
          groupName: inputValue,
          category: categoryUrlNames[categoryName],
        })
      );
      return;
    }

    const categoryId = category?.filter(
      (item) => item.type === categoryUrlNames[categoryName]
    )[0].id;
    dispatch(loadPostsRequestAction({ categoryId, recruitName: inputValue }));
  }, [isGroup]);

  const changeSelect = useCallback(
    (value) => {
      if (value === 'group') {
        setIsGroup(true);
      } else {
        setIsGroup(false);
      }
    },
    [isGroup]
  );
  return (
    <SearchContainer ref={containerRef}>
      <Header type='white' backButton='true' title='모임 검색' />
      <SearchInput
        value={inputValue}
        onChange={onChangeInputValue}
        onPressEnter={onPressInput}
        onSearch={onPressInput}
      />

      <Select defaultValue='group' size='small' onChange={changeSelect}>
        <Option value='group'>모임</Option>
        <Option value='recruit'>모집글</Option>
      </Select>
      {isGroup
        ? groups && <GroupList groups={groups} />
        : posts && <PostList category={categoryName} posts={posts} />}

      {isGroup && <FixedButton onClick={toggleFilter} />}
      {isShowFilter && (
        <SearchFilter
          toggleFilter={toggleFilter}
          sortBase={sortBase}
          setSortBase={setSortBase}
          peopleNumber={peopleNumber}
          setPeopleNumber={setPeopleNumber}
          setActiveDay={setActiveDay}
          setActiveLocation={setActiveLocation}
        />
      )}
    </SearchContainer>
  );
};

export default SearchMain;
