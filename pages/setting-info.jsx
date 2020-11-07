import React, { useState } from 'react';
import InitialLocation from '../components/locationSetting/InitialLocation';
import Selection from '../components/locationSetting/Selection';

const settingInfo = () => {
  const [showingModal, setShowingModal] = useState(true);

  return (
    <>
      {showingModal && <InitialLocation setShowingModal={setShowingModal} />}
      {!showingModal && <Selection setShowingModal={setShowingModal} />}
    </>
  );
};

export default settingInfo;
