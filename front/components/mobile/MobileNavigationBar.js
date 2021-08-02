/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useMemo, useState } from 'react';
import { Input, Row } from 'antd';
import { SearchOutlined, UnorderedListOutlined } from '@ant-design/icons';
import propTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { LOG_OUT_REQUEST } from '../../reducers/user';
import useInput from '../../hooks/useInput';

const MobileNavigationBar = ({ me }) => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const onSearch = useCallback(() => {
    if (searchInput) {
      Router.push(`/search/${searchInput}`);
    }
  }, [searchInput]);

  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  const toggleMenu = useCallback(() => {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }, [showMenu]);

  const wrapper = useMemo(() => ({ background: '#fff', boxShadow: '0 5px 10px rgba(0,0,0,0.19), 0 1px 3px rgba(0,0,0,0.23)', height: '65px', paddingTop: '15px', position: 'fixed', top: '0', zIndex: '1050', width: '100%', justifyContent: 'spaceBetween' }), []);

  /* 로고 */
  const logoWrapper = useMemo(() => ({ float: 'left', marginLeft: '7vw' }), []);
  const logoImgWrapper = useMemo(() => ({ height: '40px', width: '40px', margin: '-1px 3px 0 5px' }), []);

  /* NUTEE */
  const nuteeWrapper = useMemo(() => ({ float: 'left', margin: '10px 10px 0px 0px' }), []);
  const nuteeAWrapper = useMemo(() => ({ fontFamily: 'Do Hyeon', color: '#13c276', fontSize: '40px' }), []);

  /* menu */
  const nuteeMenu = useMemo(() => ({ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', background: '#f0faf5', paddingBottom: '20px', paddingLeft: '0px' }), []);
  const menuList = useMemo(() => ({ padding: '8px 12px', listStyle: 'none', color: '#13c276', width: '90%', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: '#b4efc8', fontStyle: 'Do Hyeon', fontSize: '17px', fontWeight: '600', textDecoration: 'none', textAlign: 'center' }), []);
  const menuBtn = useMemo(() => ({ display: 'block', position: 'absolute', top: '15px', right: '25px', marginRight: '10px', fontSize: '35px', color: '#13c276' }), []);

  /* 검색 */
  const searchWrapper = useMemo(() => ({ float: 'left', margin: '0 5px 0 20px', minWidth: '150px', maxWidth: '720px' }), []);
  const showSearchWrapper = useMemo(() => ({ fontSize: '30px', color: '#13c276', marginTop: '2px' }), []);

  return (
    <Row style={wrapper}>
      <div style={logoWrapper}>
        <Link href="/">
          <a>
            <img style={logoImgWrapper} src="/nutee_circle.png" alt="nutee" />
          </a>
        </Link>
      </div>
      <div style={nuteeWrapper}>
        <Link href="/">
          <a>
            <b style={nuteeAWrapper}>NUTEE</b>
          </a>
        </Link>
      </div>
      {me
        ? (
          <>
            {showMenu
              ? (
                <>
                  <ul style={nuteeMenu}>
                    <li style={menuList}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Input
                          placeholder="검색어를 입력하세요."
                          allowClear
                          value={searchInput}
                          style={searchWrapper}
                          onChange={onChangeSearchInput}
                        />
                        <SearchOutlined style={showSearchWrapper} onClick={onSearch} />
                      </div>
                    </li>
                    <li style={menuList}><Link href="/profile"><a>프로필</a></Link></li>
                    <li style={menuList}>공지사항</li>
                    <li style={menuList}><Link href="/setting"><a>설정</a></Link></li>
                    <li style={menuList}>개발자 정보</li>
                    <li style={menuList} onClick={onLogout}>로그아웃</li>
                  </ul>
                </>
              )
              : (
                <>
                </>
              )}
            <UnorderedListOutlined style={menuBtn} onClick={toggleMenu} />
          </>
        )
        : <></>}
    </Row>
  );
};

MobileNavigationBar.propTypes = {
  me: propTypes.object,
}.isRequired;

export default MobileNavigationBar;
