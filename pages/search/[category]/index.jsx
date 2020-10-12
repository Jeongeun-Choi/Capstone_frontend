import React from 'react';
import { useRouter } from 'next/router';

const categoryNames = {
  programing: '프로그래밍',
  game: '게임',
  sports: '스포츠',
  contest: '공모전',
  study: '스터디',
  music: '음악'
};

const index = () => {
  const router = useRouter();
  const { category } = router.query;

  return <div>{categoryNames[category]}</div>;
};

export default index;
