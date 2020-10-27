import React, { useRef, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import {
  HomeOutlined,
  TeamOutlined,
  HeartOutlined,
  SearchOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

const Menubar = styled.nav`
  position: fixed;
  width: 100%;
  height: 50px;
  bottom: 0;
  min-width: 320px;

  & ul {
    width: 100%;
    min-width: 320px;
    height: 50px;
    display: flex;
    list-style: none;
    background-color: #f6f6f6;
    font-size: 20px;

    & li {
      width: 20%;
      min-width: 64px;
      height: 50px;
      text-align: center;
      line-height: 50px;
    }

    & a {
      color: #c4c4c4;
    }
  }

  a[name~=${(props) => props.selected}] {
    color: #000000;
  }
`;
const Footer = ({ pathName }) => {
  const menuRef = useRef();

  const [selected, setSelected] = useState('main');

  useEffect(() => {
    if (pathName === '') {
      setSelected('main');
    } else {
      setSelected(pathName);
    }
  }, [pathName]);

  return (
    <Menubar selected={selected} ref={menuRef}>
      <ul>
        <li>
          <Link href='/'>
            <a name='main'>
              <HomeOutlined />
            </a>
          </Link>
        </li>
        <li>
          <Link href='/search'>
            <a name='search'>
              <SearchOutlined />
            </a>
          </Link>
        </li>
        <li>
          <a name='like'>
            <HeartOutlined />
          </a>
        </li>
        <li>
          <Link href='/team'>
            <a name='team'>
              <TeamOutlined />
            </a>
          </Link>
        </li>
        <li>
          <Link href='/mypage'>
            <a name='mypage'>
              <EllipsisOutlined />
            </a>
          </Link>
        </li>
      </ul>
    </Menubar>
  );
};

export default Footer;
