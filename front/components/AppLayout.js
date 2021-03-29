/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import NavigationBar from './NavigationBar';
import LoginForm from './LoginForm';
import Footer from './Footer';

const AppLayout = ({ children }) => {
  const { me, isLoadMyInfoError } = useSelector((state) => state.user);
  const wrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', minHeight: '1000px' }), []);

  return (
    <>
      <div style={wrapper}>
        {/* 메뉴바 */}
        <NavigationBar me={me} />
        {/* 본문 내용 */}
        {me ? (
          <Row>
            <Col style={wrapper}>{children}</Col>
            <Footer />
          </Row>
        )
          : isLoadMyInfoError
            ? <LoginForm />
            : <></>}
      </div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
