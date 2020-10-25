import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadCategorysRequestAction } from '../reducers/category';
import Home from '../components/main/Home';
import Login from '../components/main/Login';
import Signup from '../components/main/Signup';
import InitialLocation from '../components/locationSetting/InitialLocation';

const index = () => {
  const dispatch = useDispatch();
  const [showingLogin, setShowingLogin] = useState(true);
  const [showingSignup, setShowingSignup] = useState(false);
  const [showingInitialLocation, setShowingInitialLocation] = useState(false);

  useEffect(() => {
    dispatch(loadCategorysRequestAction());
  }, []);

  return (
    <>
      {showingSignup ? <Signup setShowingSignup={setShowingSignup} /> : null}
      {showingLogin ? (
        <Login
          setShowingLogin={setShowingLogin}
          setShowingSignup={setShowingSignup}
          setShowingInitialLocation={setShowingInitialLocation}
        />
      ) : null}
      {showingInitialLocation ? (
        <InitialLocation
          setShowingInitialLocation={setShowingInitialLocation}
        />
      ) : null}
      <Home />
    </>
  );
};

export default index;
