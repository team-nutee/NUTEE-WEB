import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import { useSelector } from 'react-redux';
import NavigationBar from './NavigationBar';
import MobileNavigationBar from './modile/MobileNavigationBar';
import LoginForm from './LoginForm';

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const wrapper = useMemo(() => ({ background: '#f0faf5', display: 'flex', justifyContent: 'center', minHeight: '100vh' }), []);
  const [mobileScreen, setMobileScreen] = useState(false);

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
    <>
      <div style={wrapper}>
        {
        mobileScreen
          ? <MobileNavigationBar me={me} /> // 모바일 화면
          : <NavigationBar me={me} /> // 데스크탑 화면
        }
        {/* 본문 내용 */}
        {me ? <Row>{children}</Row> : <LoginForm />}
      </div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
