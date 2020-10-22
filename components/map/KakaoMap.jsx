import React, { useEffect } from 'react';

const { kakao } = window;

const KakaoMap = ({ lat, lng }) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
      draggable: false
    };
    const map = new kakao.maps.Map(container, options);
  });

  return <div id="map" style={{ width: '90%', height: 200 }}></div>;
};

export default KakaoMap;
