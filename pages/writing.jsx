import React from 'react';
import EmptyGroups from '../components/writing/EmptyGroups';
import { useSelector } from 'react-redux';
import Groups from '../components/team/Groups';

const writing = () => {
  const { me } = useSelector(state => state.user);

  return (
    <>
      {me.joinGroups ? (
        <>
          <div>
            “새로운 모집글을 등록하고자 하는 경우, 해당 모임을 선택하세요.”
          </div>
          <Groups groups={me.joinGroups} type="post" />
        </>
      ) : (
        <EmptyGroups />
      )}
    </>
  );
};

export default writing;
