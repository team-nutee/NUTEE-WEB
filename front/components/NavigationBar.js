import React, { useCallback, useMemo, useState } from 'react';
import { Button, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { logoutRequestAction } from '../reducers/user';
import Search from './Search/Search';

const NavigationBar = ({ me }) => {
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  const onOpenSearch = useCallback(() => { setShowSearch(true); }, []);
  const onCloseSearch = useCallback(() => { setShowSearch(false); }, []);
  const onLogOut = useCallback(() => {
    const accessToken = localStorage.getItem('accessToken');
    dispatch(logoutRequestAction({ accessToken }));
    Router.push('/');
  }, []);

  const onHome = () => {
    if (document.location.href !== 'http://nutee.kr/') {
      return Router.push('/');
    }
    return document.location.reload();
  };

  const wrapper = useMemo(() => ({ background: '#fff', boxShadow: '0 5px 10px rgba(0,0,0,0.19), 0 1px 3px rgba(0,0,0,0.23)', height: '65px', paddingTop: '15px', position: 'fixed', top: '0', zIndex: '1050', width: '100%' }), []);
  /* 로고 */
  const logoWrapper = useMemo(() => ({ float: 'left', marginLeft: '7vw' }), []);
  const logoImgWrapper = useMemo(() => ({ height: '40px', width: '40px', margin: '-1px 3px 0 5px' }), []);

  /* NUTEE */
  const nuteeWrapper = useMemo(() => ({ float: 'left', margin: '10px 10px 0px 0px' }), []);
  const nuteeAWrapper = useMemo(() => ({ fontFamily: 'Do Hyeon', color: '#13c276', fontSize: '40px' }), []);

  /* 검색 */
  const showSearchWrapper = useMemo(() => ({ fontSize: '30px', color: '#13c276', marginTop: '2px' }), []);

  /* 로그아웃 */
  const logoutWrapper = useMemo(() => ({ float: 'right', marginRight: '7vw' }), []);
  const logoutButtonWrapper = useMemo(() => ({ background: '#13c276', marginRight: '10px', borderColor: '#fff', color: 'white' }), []);

  return (
    <Row style={wrapper}>
      <div style={logoWrapper}>
        <div onClick={onHome} role="presentation">
          <img style={logoImgWrapper} src="/nutee_circle.png" alt="nutee" />
        </div>
      </div>
      <div style={nuteeWrapper} onClick={onHome} role="presentation">
        <b style={nuteeAWrapper}>NUTEE</b>
      </div>
      {me || me !== null
        ? (
          <>
            {showSearch
              ? (
                <Search onCloseSearch={onCloseSearch} />
              )
              : (
                <>
                  <SearchOutlined style={showSearchWrapper} onClick={onOpenSearch} />
                  <div style={logoutWrapper}>
                    <Button
                      style={logoutButtonWrapper}
                      shape="round"
                      onClick={onLogOut}
                    >
                      <b>로그아웃</b>
                    </Button>
                  </div>
                </>
              )}
          </>
        )
        : <></>}
    </Row>
  );
};

NavigationBar.defaultProps = {
  me: null,
};

NavigationBar.propTypes = {
  me: PropTypes.object,
};

export default NavigationBar;
