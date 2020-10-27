import React, { useState, useCallback } from 'react';
import { Slider, Select, TimePicker } from 'antd';
import {
  Modal,
  ModalHeader,
  modalFooter,
  basicStyle
} from '../../public/style';
import { useSelector } from 'react-redux';
import FindingAddress from '../locationSetting/FindingAddress';
import KakaoMap from '../map/KakaoMap';
import styled from '@emotion/styled';
import { LeftOutlined } from '@ant-design/icons';
import inputChangeHook from '../../hooks/inputChangeHook';
import timePickerHook from '../../hooks/timePickerHook';
import Upload from '../uploadImg/Upload';

const format = 'HH:mm';
const { Option } = Select;

const days = {
  월: 'mon',
  화: 'tue',
  수: 'wed',
  목: 'thu',
  금: 'fri',
  토: 'sat',
  일: 'sun'
};

const formatter = value => {
  return `${value}명`;
};

const MakingTeamContainer = styled.form`
  width: 100%;

  & .team-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: auto;

    & .team-item {
      width: 90%;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
  & .team-input {
    ${basicStyle};
    width: 60%;
    border: none;
  }
  & .subtitle {
    font-weight: bold;
    margin-right: 5px;
  }
  & .team-location-title {
    display: flex;
  }

  & .team-active-day-content {
    display: flex;

    & .team-active-day-content-item {
      width: 40px;
      height: 25px;
      border: 1px solid #aaa69d;
      border-radius: 5px;
      text-align: center;
      margin-right: 5px;
    }

    & .team-active-day-content-item-active {
      border: 1px solid #aaabd3;
      background-color: #aaabd3;
      color: #ffffff;
    }
  }
`;

const MakingTeamHeader = styled(ModalHeader)`
  color: #ffffff;
  background-color: #aaabd3;

  h3 {
    color: #ffffff;
  }
`;

const MakingTeamFooter = styled.button`
  ${modalFooter};
  border: 1px solid #aaabd3;
  background-color: #aaabd3;
  color: #ffffff;
  font-weight: bold;
`;

const MakingTeam = ({ setCloseModal }) => {
  const { categories } = useSelector(state => state.category);

  //TODO: categoryId로 바꾸기
  const [category, setCategory] = useState([]);
  const [groupName, setGroupName] = inputChangeHook('');
  const [groupIntro, setGroupIntro] = inputChangeHook('');
  const [location, setLocation] = useState('');
  const [personnel, setPersonnel] = useState(0);
  const [activeTimes, setActiveTimes] = useState([]);
  const [activeDays, setActiveDays] = useState([]);
  const [startTime, setStartTime] = timePickerHook('');
  const [endTime, setEndTime] = timePickerHook('');
  const [skills, setSkills] = inputChangeHook('');
  const [groupImages, setGroupImages] = useState([]);
  const [middleCategory, setMiddleCategory] = useState('');
  const [showDetailCategory, setShowDetailCategory] = useState(false);

  const changeSlider = useCallback(value => {
    setPersonnel(value);
  }, []);

  const changeMiddleCategory = useCallback(value => {
    setMiddleCategory(value);
    setShowDetailCategory(prev => !prev);
  }, []);

  const changeDetailCategory = useCallback(value => {
    setCategory([value]);
  }, []);

  const changeDayState = useCallback(e => {
    const { target } = e;
    const className = 'team-active-day-content-item-active';
    if (target.classList.contains(className)) {
      target.classList.remove(className);
      const index = activeDays.findIndex(day => day === target.name);
      setActiveDays([
        ...activeDays.slice(0, index),
        ...activeDays.slice(index + 1, activeDays.length)
      ]);
    } else {
      target.classList.add(className);
      setActiveDays([...activeDays, target.name]);
    }
  });

  const splitSkills = useCallback(() => {
    const skillArray = skills.split(',').reduce((acc, skill) => {
      return acc.push({ name: skill.trim() });
    }, []);

    setSkills(skillArray);
  }, []);

  const makeActiveTimes = useCallback(() => {
    const activeTimes = activeDays.reduce((acc, day) => {
      return acc.push({
        activeDay: day,
        startTime: startTime,
        endTime: endTime
      });
    }, []);
    setActiveTimes(activeTimes);
  }, []);

  const submitResult = useCallback(() => {
    splitSkills();
    makeActiveTimes();

    const data = {
      category,
      groupName,
      groupIntro,
      location,
      skills,
      maxMember,
      activeTimes
    };
  }, []);

  const closeModal = useCallback(() => {
    setCloseModal(prev => !prev);
  }, []);

  return (
    <Modal>
      <MakingTeamContainer
        onSubmit={submitResult}
        encType="multipart/form-data"
      >
        <MakingTeamHeader>
          <h3>모임 개설</h3>
          <LeftOutlined onClick={closeModal} />
        </MakingTeamHeader>
        <main className="team-content">
          <div className="team-item">
            <div className="category-title">
              <div className="subtitle">카테고리</div>
              <Select onChange={changeMiddleCategory} style={{ width: 100 }}>
                {Object.keys(categories).map(category => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
              {showDetailCategory && (
                <Select onChange={changeDetailCategory} style={{ width: 100 }}>
                  {categories[middleCategory].map(category => (
                    <Option key={category.id} value={category.id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
              )}
            </div>
          </div>
          <div className="team-item">
            <div className="subtitle">모임명</div>
            <input
              onChange={setGroupName}
              className="team-input"
              placeholder="모임명"
            />
          </div>
          <div className="team-item">
            <div className="subtitle">모임소개</div>
            <textarea
              className="team-info-textarea"
              onChange={setGroupIntro}
              rows="5"
              cols="33"
            >
              블라블라머시기어쩌고
            </textarea>
          </div>
          <div className="team-item">
            <div className="subtitle">활동 요일</div>
            <div className="team-active-day-content">
              {Object.keys(days).map(day => (
                <div
                  key={day}
                  name={day}
                  className="team-active-day-content-item"
                  onClick={changeDayState}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className="team-item">
            <div className="subtitle">활동 시간</div>
            <div className="team-active-time-content">
              <TimePicker format={format} onChange={setStartTime} />
              <TimePicker format={format} onChange={setEndTime} />
            </div>
          </div>
          <div className="team-item">
            <div className="subtitle">최대 인원</div>
            <Slider
              defaultValue={0}
              max={10}
              tipFormatter={formatter}
              onChange={changeSlider}
            />
          </div>
          <div className="team-item">
            <div className="subtitle">활동을 위해 필요한 스킬</div>
            <input
              className="team-input"
              placeholder=",로 구분하여 적으세요."
              onChange={setSkills}
            />
          </div>
          <div className="team-item">
            <div className="team-location-title">
              <div className="subtitle">모임 지역</div>
              {location.length !== 0 ? <div>{location}</div> : null}
            </div>
            <FindingAddress locations={location} setLocations={setLocation} />
            {location.length !== 0 ? <KakaoMap location={location} /> : null}
          </div>
          <div className="team-item">
            <div className="subtitle">이미지 추가</div>
            <Upload images={groupImages} setImages={setGroupImages} />
          </div>
        </main>
        <MakingTeamFooter htmlType="submit">모임 개설하기</MakingTeamFooter>
      </MakingTeamContainer>
    </Modal>
  );
};

export default MakingTeam;
