import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head'; //head 수정!!
import withReduxSaga from 'next-redux-saga';
import wrapper from '../store/configureStore';
import AppLayout from '../components/AppLayout';
import 'antd/dist/antd.css';
import '../public/global.css';
import { MAP_API } from '../api';

const App = ({ Component, pageProps }) => {
  return (
    // next-redux-wrapper@6에선 Provider로 감싸지 않아도 된다.
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>App</title>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${MAP_API}`}
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
