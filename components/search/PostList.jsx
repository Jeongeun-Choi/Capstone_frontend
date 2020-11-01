import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import Item from './Item';

const PostContainer = styled.ul`
  width: 95%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const PostList = ({ category, posts }) => {
  return (
    <PostContainer>
      {posts.map(post => (
        <Item
          type="post"
          name={post.title}
          id={post.id}
          category={category}
          location={post.JoinGroup.Group.location}
          image={post.JoinGroup.Group.GroupImages[0]}
        />
      ))}
    </PostContainer>
  );
};

export default PostList;
