import React from 'react';
import { Menubar, Menu } from '../../public/style';
import Link from 'next/link';

const Footer = () => {
  return (
    <Menubar>
      <Link href="/">
        <Menu>1</Menu>
      </Link>
      <Link href="/search">
        <Menu>2</Menu>
      </Link>
      <Menu>3</Menu>
      <Link href="/team">
        <Menu>4</Menu>
      </Link>
      <Menu>5</Menu>
    </Menubar>
  );
};

export default Footer;
