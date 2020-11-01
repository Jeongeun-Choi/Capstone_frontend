import React, { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import LocationSetting from '../locationSetting/LocationSetting';
import { useDispatch } from 'react-redux';
import { updatePreferLocationReuqestAction } from '../../reducers/user';

const LocationContainer = styled.section`
  display: flex;
  flex-direction: column;
  & .location_explain {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .location_modify_button {
    background-color: white;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
  }

  & .location_list {
    margin-top: 1rem;
  }
  & .location_item {
    padding: 1rem 0;
  }

  & .location_column,
  & .location_city {
    font-weight: bold;
  }

  & .location_city {
    font-size: 1.2rem;
  }
`;

const PreferLocation = ({ myInfo }) => {
  const dispatch = useDispatch();

  const [isModify, setIsModify] = useState(false);
  const changeStatus = () => {
    setIsModify((prev) => !prev);
  };

  const [locations, setLocations] = useState(
    myInfo.PreferLocations.map((location) => {
      const [sido, sigungu, bname] = location.address.split(' ');
      return {
        ...location,
        sido,
        sigungu,
        bname,
      };
    })
  );

  const onSubmit = (tempLocations) => {
    dispatch(
      updatePreferLocationReuqestAction({
        memberId: myInfo.id,
        locations: tempLocations.map((location) =>
          location.address
            ? location
            : {
                address: `${location.sido} ${location.sigungu} ${location.bname}`,
              }
        ),
      })
    );
  };

  return (
    <>
      <LocationContainer>
        <div className='location_explain'>
          등록된 활동 지역의 새로운 모임을 놓치지 않도록 홈 화면에서
          보여드릴게요.
          <button className='location_modify_button' onClick={changeStatus}>
            <SettingOutlined />
          </button>
        </div>
        {myInfo?.PreferLocations?.length && (
          <ul className='location_list'>
            {myInfo.PreferLocations.map((location, index) => {
              const [state, city, dong] = location.address.split(' ');
              return (
                <li key={location.id} className='location_item'>
                  <div>
                    <span className='location_column'>{index + 1}순위</span> /{' '}
                    {state}
                  </div>
                  <div className='location_city'>
                    {city} {dong}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </LocationContainer>
      {isModify && (
        <LocationSetting
          setShowingLocationModal={setIsModify}
          locations={locations}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default PreferLocation;
