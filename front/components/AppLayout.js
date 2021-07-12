import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import NavigationBar from './NavigationBar';
import MobileNavigationBar from './mobile/MobileNavigationBar';
import LoginForm from './LoginForm';
import Footer from './Footer';
import Empty from './Empty';

const AppLayout = ({ children }) => {
  const { me, isLoadMyInfoError } = useSelector((state) => state.user);
  const wrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center', minHeight: '1000px' }), []);
  const [mobileScreen, setMobileScreen] = useState(false);
  const page = isLoadMyInfoError ? (
    <>
      <NavigationBar />
      <LoginForm />
    </>
  ) : <Empty />;

  useEffect(
    function onMobileWidth() {
      if ((window.innerWidth || document.body.clientWidth) > 750) {
        setMobileScreen(false);
      } else {
        setMobileScreen(true);
      }
      window.addEventListener('resize', onMobileWidth);
      return () => {
        window.removeEventListener('resize', onMobileWidth);
      };
    },
  );

  return (
    <div style={wrapper}>
      {me ? (
        <>
          {
          mobileScreen
            ? <MobileNavigationBar me={me} />
            :<NavigationBar me={me} />
          } 
          <Row>
            <Col style={wrapper}>{children}</Col>
            <Footer />
          </Row>
        </>
      )
        : page}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
