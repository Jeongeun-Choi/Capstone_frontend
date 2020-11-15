import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head'; //head 수정!!
import withReduxSaga from 'next-redux-saga';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import 'antd/dist/antd.css';
import '../public/global.css';

const App = ({ Component, pageProps }) => {
  return (
    // next-redux-wrapper@6에선 Provider로 감싸지 않아도 된다.
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>모두의 모임</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
          rel="stylesheet"
        ></link>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.MAP_API}`}
        ></script>
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired
};
export default wrapper.withRedux(withReduxSaga(App));
