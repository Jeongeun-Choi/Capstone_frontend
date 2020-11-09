import React from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import Item from './Item';

const PostContainer = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 30% 30%;
  row-gap: 1.5rem;
  column-gap: 1.5rem;
  justify-content: center;
  padding: 2rem 0;

  @media screen and (max-width: 580px) {
    grid-template-columns: 40% 40%;
  }

  @media screen and (min-width: 1080px) {
    grid-template-columns: 20% 20% 20% 20%;
  }
`;

const PostList = ({ category, posts }) => {
  return (
    <PostContainer>
      {posts.length ? (
        posts.map((post) => (
          <Item
            key={post.id}
            type='post'
            name={post.title}
            id={post.id}
            category={category}
            location={post?.JoinGroup?.Group?.location}
            image={
              post?.JoinGroup?.Group?.GroupImages?.length &&
              post?.JoinGroup?.Group?.GroupImages[0]
            }
          />
        ))
      ) : (
        <div>모집 글이 없습니다.</div>
      )}
    </PostContainer>
  );
};

export default PostList;
