import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategorysRequestAction } from '../reducers/category';
import Home from '../components/main/Home';
import Login from '../components/main/Login';
import Signup from '../components/main/Signup';
import InitialLocation from '../components/locationSetting/InitialLocation';
import { loadMyInfoRequestAction } from '../reducers/user';

const index = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [showingLogin, setShowingLogin] = useState(true);
  const [showingSignup, setShowingSignup] = useState(false);
  const [showingInitialLocation, setShowingInitialLocation] = useState(false);

  useEffect(() => {
    dispatch(loadCategorysRequestAction());
    if (!me.id) dispatch(loadMyInfoRequestAction());
  }, []);

  return (
    <>
      {!me.id && showingSignup && (
        <Signup setShowingSignup={setShowingSignup} />
      )}
      {!me.id && showingLogin && (
        <Login
          setShowingLogin={setShowingLogin}
          setShowingSignup={setShowingSignup}
          setShowingInitialLocation={setShowingInitialLocation}
        />
      )}
      {me.id &&
        !me.PreferLocations?.length &&
        !me.PreferCategories?.length &&
        me.showingInitialLocation && (
          <InitialLocation
            setShowingInitialLocation={setShowingInitialLocation}
          />
        )}
      <Home />
    </>
  );
};

export default index;
