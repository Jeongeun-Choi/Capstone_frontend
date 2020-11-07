import React, { useState, useCallback, useEffect, useRef } from 'react';
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
import useInputChangeHook from '../../hooks/useInputChangeHook';
import usePickerHook from '../../hooks/usePickerHook';
import Upload from '../uploadImg/Upload';
import {
  addGroupRequestAction,
  updateGroupRequestAction
} from '../../reducers/group';
import useCheckResult from '../../hooks/useCheckResult';

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
      margin-top: 1rem;
      margin-bottom: 0.2rem;
     //border: 1px solid purple;
    }
  }
  & .team-input {
    ${basicStyle};
    width: 60%;
    border: none;
  }
  & .subtitle {
    margin-right: 5px;
    //border: 1px solid red;
    font-weight: bold;
  }

  & textarea {
    resize: none;
    border: none;
    width: 60%;
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
      border: 1px solid #6055cd;
      background-color: #6055cd;
      color: #ffffff;
    }
  }
`;

const MakingGroupHeader = styled(ModalHeader)`
  color: black;
  background-color: white;

  h3 {
    color: black;
  }
`;

const MakingGroupFooter = styled.button`
  ${modalFooter};
  border: 1px solid #6055cd;
  background-color: #6055cd;
  color: #ffffff;
  font-weight: bold;
`;

const MakingGroup = ({
  setCloseModal,
  groupId,
  modify = false,
  data = null
}) => {
  const { categories } = useSelector(state => state.category);
  const { me } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const {
    name,
    ActiveCategories,
    GroupImages,
    ActiveTimes,
    Skills,
    groupIntro,
    location,
    memberCount
  } = data;

  const [category, setCategory] = useState([]);
  const [groupName, changeGroupName] = useInputChangeHook(modify ? name : '');
  const [intro, changeIntro] = useInputChangeHook(modify ? groupIntro : '');
  const [groupLocation, setGroupLocation] = useState(modify ? location : '');
  const [maxMember, setMaxMember] = useState(modify ? memberCount : 0);
  const [activeDays, setActiveDays] = useState([]);
  const [startTime, changeStartTime] = usePickerHook('');
  const [endTime, changeEndTime] = usePickerHook('');
  const [skills, setSkills] = useState('');
  const [groupImages, setGroupImages] = useState(modify ? GroupImages : []);
  const [middleCategory, setMiddleCategory] = useState(
    modify ? ActiveCategories[0].DetailCategory.Category.type : ''
  );
  const [detailCategory, setDetailCategory] = useState(
    modify ? ActiveCategories[0].DetailCategory.name : ''
  );
  const [showDetailCategory, setShowDetailCategory] = useState(
    modify ? true : false
  );

  useEffect(() => {
    if (modify) {
      const activeDayArray = ActiveTimes.map(time => time.activeDay);
      const skillsString = Skills.map(skill => skill.name).join(', ');
      setActiveDays(activeDayArray);
      setSkills(skillsString);
    }
  }, []);

  const changeSlider = useCallback(
    value => {
      setMaxMember(value);
    },
    [maxMember]
  );

  const changeSkills = useCallback(e => {
    setSkills(e.target.value);
  }, []);

  const changeMiddleCategory = useCallback(
    value => {
      setMiddleCategory(value);
      !showDetailCategory && setShowDetailCategory(prev => !prev);
    },
    [middleCategory, showDetailCategory]
  );

  const changeDetailCategory = useCallback(
    value => {
      setCategory([value]);
    },
    [detailCategory]
  );

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
        groupIntro: intro,
        location: groupLocation,
        skills,
        maxMember,
        activeDays,
        startTime,
        endTime,
        groupImages,
        memberId: me.id
      };

      try {
        dispatch(addGroupRequestAction(data));
        setCloseModal(prev => !prev);
      } catch (err) {
        console.log(err);
      }
    },
    [
      activeDays,
      startTime,
      endTime,
      category,
      groupName,
      intro,
      groupLocation,
      skills,
      maxMember,
      groupImages
    ]
  );

  const modifyGroup = useCallback(
    e => {
      e.preventDefault();

      const body = {
        groupId,
        detailCategoryIds: category,
        groupName,
        groupIntro: intro,
        location: groupLocation,
        skills,
        maxMember,
        activeDays,
        startTime,
        endTime,
        groupImages,
        memberId: me.id
      };
      try {
        dispatch(updateGroupRequestAction(body));
        setCloseModal(prev => !prev);
      } catch (err) {
        console.log(err);
      }
    },
    [
      activeDays,
      startTime,
      endTime,
      category,
      groupName,
      intro,
      groupLocation,
      skills,
      maxMember,
      groupImages
    ]
  );

  const closeModal = useCallback(() => {
    setCloseModal(prev => !prev);
  }, []);

  return (
    <>
      <Modal>
        <MakingGroupContainer encType="multipart/form-data">
          <MakingGroupHeader>
            <h3>{modify ? '모임 수정' : '모임 개설'}</h3>
            <LeftOutlined onClick={closeModal} />
          </MakingGroupHeader>
          <main className="team-content">
            <div className="team-item">
              <div className="category-title">
                <div className="subtitle">카테고리</div>

                <Select
                  defaultValue={(modify && middleCategory) || '선택하세요.'}
                  onChange={changeMiddleCategory}
                  style={{ width: 200 }}
                >
                  {Object.keys(categories).map(category => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
                {showDetailCategory && (
                  <Select
                    defaultValue={detailCategory}
                    onChange={changeDetailCategory}
                    style={{ width: 100 }}
                  >
                    {middleCategory &&
                      categories[middleCategory].map(category => (
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
                value={groupName}
              />
            </div>
            <div className="team-item">
              <div className="subtitle">모임소개</div>
              <textarea
                className="team-info-textarea"
                onChange={changeIntro}
                rows="5"
                cols="33"
                value={intro}
                placeholder="그룹 소개를 적어주세요."
              ></textarea>
            </div>
            <div className="team-item">
              <div className="subtitle">활동 요일</div>
              <div className="team-active-day-content">
                {Object.keys(days).map(day => {
                  if (modify && activeDays.includes(day)) {
                    return (
                      <div
                        key={day}
                        id={day}
                        className="team-active-day-content-item team-active-day-content-item-active"
                        onClick={changeDayState}
                      >
                        {day}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={day}
                        id={day}
                        className="team-active-day-content-item"
                        onClick={changeDayState}
                      >
                        {day}
                      </div>
                    );
                  }
                })}
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
                defaultValue={maxMember}
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
                value={skills}
              />
            </div>
            <div className="team-item">
              <div className="team-location-title">
                <div className="subtitle">모임 지역</div>
                {location.length && <div>{location}</div>}
              </div>
              <FindingAddress
                locations={groupLocation}
                setLocations={setGroupLocation}
              />
              {groupLocation.length && <KakaoMap location={groupLocation} />}
            </div>
            <div className="team-item">
              <div className="subtitle">이미지 추가</div>
              <Upload images={groupImages} setImages={setGroupImages} />
            </div>
          </main>
          {modify ? (
            <MakingGroupFooter type="submit" onClick={modifyGroup}>
              수정 완료
            </MakingGroupFooter>
          ) : (
            <MakingGroupFooter type="submit" onClick={submitResult}>
              모임 개설하기
            </MakingGroupFooter>
          )}
        </MakingGroupContainer>
      </Modal>
    </>
  );
};

export default MakingGroup;
