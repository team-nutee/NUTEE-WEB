import React, { useCallback, useMemo } from 'react';
import { Button, Row } from 'antd';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutRequestAction } from '../reducers/user';

const NavigationBar = ({ me }) => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch(logoutRequestAction({ accessToken }));
  }, []);

  const wrapper = useMemo(() => ({ background: '#fff', boxShadow: '0 5px 10px rgba(0,0,0,0.19), 0 1px 3px rgba(0,0,0,0.23)', height: '65px', paddingTop: '15px', position: 'fixed', top: '0', zIndex: '1050', width: '100%' }), []);
  /* 로고 */
  const logoWrapper = useMemo(() => ({ float: 'left', marginLeft: '7vw' }), []);
  const logoImgWrapper = useMemo(() => ({ height: '40px', width: '40px', margin: '-1px 3px 0 5px' }), []);

  /* NUTEE */
  const nuteeWrapper = useMemo(() => ({ float: 'left', margin: '10px 10px 0px 0px' }), []);
  const nuteeAWrapper = useMemo(() => ({ fontFamily: 'Do Hyeon', color: '#13c276', fontSize: '40px' }), []);

  /* 로그아웃 */
  const logoutWrapper = useMemo(() => ({ float: 'right', marginRight: '7vw' }), []);
  const logoutButtonWrapper = useMemo(() => ({ background: '#13c276', marginRight: '10px', borderColor: '#fff', color: 'white' }), []);

  return (
    <Row style={wrapper}>
      <div style={logoWrapper}>
        <Link href="/index">
          <a>
            <img style={logoImgWrapper} src="/nutee_circle.png" alt="nutee" />
          </a>
        </Link>
      </div>
      <div style={nuteeWrapper}>
        <Link href="/index">
          <a>
            <b style={nuteeAWrapper}>NUTEE</b>
          </a>
        </Link>
      </div>
      {me || me !== null
        ? (
          <div style={logoutWrapper}>
            <Button
              style={logoutButtonWrapper}
              shape="round"
              onClick={onLogOut}
            >
              <b>로그아웃</b>
            </Button>
          </div>
        )
        : <></>}
    </Row>
  );
};

NavigationBar.propTypes = {
  me: PropTypes.object.isRequired,
};

export default NavigationBar;
