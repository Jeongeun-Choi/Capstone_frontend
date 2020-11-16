import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategorysRequestAction } from '../reducers/category';
import Header from '../components/main/Header';
import Home from '../components/main/Home';

const index = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadCategorysRequestAction());
  }, []);

  return (
    <>
      <Header type='white' title='홈' />
      <Home />
    </>
  );
};

export default index;
