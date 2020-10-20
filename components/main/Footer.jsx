import React, { useRef, useState, useEffect } from 'react';
import { Menubar } from '../../public/style';
import Link from 'next/link';
import {
  HomeOutlined,
  TeamOutlined,
  HeartOutlined,
  SearchOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

const Footer = ({ pathName }) => {
  const menuRef = useRef();

  const [selected, setSelected] = useState('main');

  useEffect(() => {
    const path = pathName.split('/')[1];
    if (path === '') {
      setSelected('main');
    } else {
      setSelected(path);
    }
  }, [pathName]);

  return (
    <Menubar selected={selected} ref={menuRef}>
      <ul>
        <li>
          <Link href="/">
            <a name="main">
              <HomeOutlined />
            </a>
          </Link>
        </li>
        <li>
          <Link href="/search">
            <a name="search">
              <SearchOutlined />
            </a>
          </Link>
        </li>
        <li>
          <a name="like">
            <HeartOutlined />
          </a>
        </li>
        <li>
          <Link href="/team">
            <a name="team">
              <TeamOutlined />
            </a>
          </Link>
        </li>
        <li>
          <a name="mypage">
            <EllipsisOutlined />
          </a>
        </li>
      </ul>
    </Menubar>
  );
};

export default Footer;
