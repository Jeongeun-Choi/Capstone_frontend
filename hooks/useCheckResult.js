import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

const Screen = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(125, 125, 125, 0.7);

  & .button_container {
    width: 40%;
    min-width: 350px;
    height: 20vh;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: white;

    & .content_wrapper {
      width: 70%;
      padding: 1rem;
      border-bottom: 1px solid grey;
      margin-bottom: 1rem;
      text-align: center;

      & .screen_title {
        font-weight: bold;
        font-size: 1rem;
      }

      & .screen_content {
        font-size: 1em;
      }
    }

    & button {
      color: #1c32ff;
      background: white;
      border: none;
      cursor: pointer;
    }
  }
`;

const useCheckResult = ({ title, content, pushUrl, onClick }) => {
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);

  const toggleShow = () => {
    setIsShow((prev) => !prev);
  };

  const clickHandler = () => {
    pushUrl && router.push(pushUrl);
    onClick && onClick();
  };

  const closeScreen = () => {
    setIsShow(false);
  };

  const CheckScreen = () => {
    return (
      <>
        {isShow && (
          <Screen onClick={closeScreen}>
            <div className='button_container'>
              <div className='content_wrapper'>
                {title && <div className='screen_title'>{title}</div>}
                {content && <div className='screen_content'>{content}</div>}
              </div>

              <button onClick={clickHandler}>확인</button>
            </div>
          </Screen>
        )}
      </>
    );
  };

  return [toggleShow, CheckScreen];
};

export default useCheckResult;
