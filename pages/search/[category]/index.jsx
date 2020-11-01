import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { Select } from 'antd';
import { loadGroupsRequestAction } from '../../../reducers/group';
import { loadPostsRequestAction } from '../../../reducers/post';
import GroupList from '../../../components/search/GroupList';
import PostList from '../../../components/search/PostList';
import { useDispatch, useSelector } from 'react-redux';
import { categoryUrlNames } from '../../../utils/categoryNames';

const { Option } = Select;

const SearchContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);
  const { groups } = useSelector(state => state.group);
  const { category } = useSelector(state => state.category);
  const categoryName = router.query.category;
  const [isGroup, setIsGroup] = useState(true);
  const [filterGroups, setFilterGroups] = useState([]);

  useEffect(() => {
    const categoryId = category.filter(
      item => item.type === categoryUrlNames[categoryName]
    )[0].id;

    if (posts.length === 0 && groups.length === 0) {
      dispatch(loadGroupsRequestAction());
      dispatch(loadPostsRequestAction({ categoryId }));
    }

    const newGroups = groups.filter(
      group =>
        group.ActiveCategories[0].DetailCategory.Category.id === categoryId
    );
    setFilterGroups(newGroups);
  }, [category, posts, groups]);

  const changeSelect = useCallback(value => {
    if (value === 'group') {
      setIsGroup(true);
    } else {
      setIsGroup(false);
    }
  }, []);

  return (
    <SearchContainer>
      <Select defaultValue="group" size="small" onChange={changeSelect}>
        <Option value="group">모임</Option>
        <Option value="recruit">모집글</Option>
      </Select>
      {isGroup
        ? groups && <GroupList category={categoryName} groups={filterGroups} />
        : posts && <PostList category={categoryName} posts={posts} />}
    </SearchContainer>
  );
};

export default index;
