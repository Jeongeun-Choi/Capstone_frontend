import React, { useState, useCallback } from 'react';
import { Slider, Select, TimePicker } from 'antd';
import {
  Modal,
  ModalHeader,
  modalFooter,
  basicStyle
} from '../../public/style';
import { useSelector, useDispatch } from 'react-redux';
import FindingAddress from '../locationSetting/FindingAddress';
import KakaoMap from '../map/KakaoMap';
import styled from '@emotion/styled';
import { LeftOutlined } from '@ant-design/icons';
import inputChangeHook from '../../hooks/inputChangeHook';
import usePickerHook from '../../hooks/usePickerHook';
import Upload from '../uploadImg/Upload';
import { addGroupRequestAction } from '../../reducers/group';

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

const MakingGroupContainer = styled.form`
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

  & textarea {
    resize: none;
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

const MakingGroupHeader = styled(ModalHeader)`
  color: #ffffff;
  background-color: #aaabd3;

  h3 {
    color: #ffffff;
  }
`;

const MakingGroupFooter = styled.button`
  ${modalFooter};
  border: 1px solid #aaabd3;
  background-color: #aaabd3;
  color: #ffffff;
  font-weight: bold;
`;

const MakingGroup = ({ setCloseModal }) => {
  const { categories } = useSelector(state => state.category);
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();
  //TODO: categoryId로 바꾸기
  const [category, setCategory] = useState([]);
  const [groupName, changeGroupName] = inputChangeHook('');
  const [groupIntro, changeGroupIntro] = inputChangeHook('');
  const [location, setLocation] = useState('');
  const [maxMember, setMaxMember] = useState(0);
  const [activeDays, setActiveDays] = useState([]);
  const [startTime, changeStartTime] = usePickerHook('');
  const [endTime, changeEndTime] = usePickerHook('');
  const [skills, setSkills] = useState('');
  const [groupImages, setGroupImages] = useState([]);
  const [middleCategory, setMiddleCategory] = useState('');
  const [showDetailCategory, setShowDetailCategory] = useState(false);

  const changeSlider = useCallback(value => {
    setMaxMember(value);
  }, []);

  const changeSkills = useCallback(e => {
    setSkills(e.target.value);
  });

  const changeMiddleCategory = useCallback(value => {
    setMiddleCategory(value);
    setShowDetailCategory(prev => !prev);
  }, []);

  const changeDetailCategory = useCallback(value => {
    setCategory([value]);
  }, []);

  const changeDayState = useCallback(
    e => {
      const { target } = e;
      const className = 'team-active-day-content-item-active';
      const targetText = target.innerText;

      if (target.classList.contains(className)) {
        target.classList.remove(className);
        const index = activeDays.findIndex(day => day === targetText);
        setActiveDays([
          ...activeDays.slice(0, index),
          ...activeDays.slice(index + 1, activeDays.length)
        ]);
      } else {
        target.classList.add(className);
        setActiveDays([...activeDays, targetText]);
      }
    },
    [activeDays]
  );

  const submitResult = useCallback(
    e => {
      e.preventDefault();

      const data = {
        category,
        groupName,
        groupIntro,
        location,
        skills,
        maxMember,
        activeDays,
        startTime,
        endTime,
        groupImages,
        memberId: me.id
      };

      dispatch(addGroupRequestAction(data));
    },
    [
      activeDays,
      startTime,
      endTime,
      category,
      groupName,
      groupIntro,
      location,
      skills,
      maxMember,
      groupImages
    ]
  );

  const closeModal = useCallback(() => {
    setCloseModal(prev => !prev);
  }, []);

  return (
    <Modal>
      <MakingGroupContainer encType="multipart/form-data">
        <MakingGroupHeader>
          <h3>모임 개설</h3>
          <LeftOutlined onClick={closeModal} />
        </MakingGroupHeader>
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
              onChange={changeGroupName}
              className="team-input"
              placeholder="모임명"
            />
          </div>
          <div className="team-item">
            <div className="subtitle">모임소개</div>
            <textarea
              className="team-info-textarea"
              onChange={changeGroupIntro}
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
                  id={day}
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
              <TimePicker format={format} onChange={changeStartTime} />
              <TimePicker format={format} onChange={changeEndTime} />
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
              onChange={changeSkills}
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
        <MakingGroupFooter type="submit" onClick={submitResult}>
          모임 개설하기
        </MakingGroupFooter>
      </MakingGroupContainer>
    </Modal>
  );
};

export default MakingGroup;
