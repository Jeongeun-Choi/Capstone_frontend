import React, { useEffect, useState } from 'react';
import Geocode from 'react-geocode';

const KakaoMap = ({ location }) => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    Geocode.setApiKey(process.env.GEOCODE_API);
    Geocode.setLanguage('kr');

    Geocode.fromAddress(location).then(
      response => {
        setLat(response.results[0].geometry.location.lat);
        setLng(response.results[0].geometry.location.lng);
      },
      error => {
        console.error(error);
      }
    );

    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
      draggable: false
    };
    const map = new kakao.maps.Map(container, options);
  }, [lat, lng, location]);

  return <div id="map" style={{ width: '90%', height: 200 }}></div>;
};

export default KakaoMap;
