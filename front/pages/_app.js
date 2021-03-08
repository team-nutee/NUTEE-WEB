import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';

const Nutee = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>NUTEE</title>
      <htmlAttributes lang="ko" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover" />
      <meta name="description" content="성공회대학교 통합 커뮤니티 서비스" />
      <meta name="og:title" content="NUTEE" />
      <meta name="og:description" content="성공회대학교 통합 커뮤니티 서비스" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="localhost:80/favicon.ico" />
      <link rel="stylesheet" href="https://fonts.gstatic.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&display=swap" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css" />
      <link rel="stylesheet" href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Do+Hyeon|Nanum+Gothic&display=swap" />
      <link rel="icon" type="image/png" href="favicon.ico" />
    </Head>
    <Component />
  </>
);

Nutee.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
  console.log(metric);
}

export default wrapper.withRedux(Nutee);
