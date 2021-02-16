import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Input, Row } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Link from "next/link";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";
import useInput from '../hooks/useInput';

const NavigationBar = ({ me }) => {
  const [searchInput, onChangeSearchInput] = useInput('');
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

  const wrapper = useMemo(() => ({ background: '#f0faf5', height: '65px', paddingTop: '15px', position: 'fixed', top: '0', zIndex: '5', width: '100%', }), []);
  /* 로고 */
  const logoWrapper = useMemo(() => ({ float: "left", marginLeft: '7vw' }), []); 
  const logoImgWrapper = useMemo(() => ({ height: '40px', width: '40px', margin: '-1px 3px 0 5px' }), []);

  /* NUTEE */
  const nuteeWrapper = useMemo(() => ({ float: "left", margin: '10px 10px 0px 0px' }), []);
  const nuteeAWrapper = useMemo(() => ({ fontFamily: 'Do Hyeon', color: '#13c276', fontSize: '40px' }), []);

  /* 검색 */
  const searchWrapper = useMemo(() => ({ float: "left", margin: '0 5px 0 20px', width: '200px' }), []);
  const showSearchWrapper = useMemo(() => ({ fontSize: '30px', color: '#13c276', marginTop: '2px' }), []);

  /* 로그아웃 */
  const logoutWrapper = useMemo(() => ({ float: 'right', marginRight: '7vw', }), []);
  const logoutButtonWrapper = useMemo(() => ({ background: '#13c276', marginRight: '10px', borderColor: '#fff', color: 'white' }), []);

  return (
    <Row style={wrapper}>
      <div style={logoWrapper}>
        <Link href="/">
          <a>
            <img style={logoImgWrapper} src={'/nutee_circle.png'} alt="nutee" />
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
      {me ?
        <>
          <>
            <Input
              placeholder="검색어를 입력하세요."
              allowClear
              value={searchInput}
              style={searchWrapper}
              onChange={onChangeSearchInput}
            /><SearchOutlined style={showSearchWrapper} onClick={onSearch} />
          </>
          <div style={logoutWrapper}>
            <Button
              style={logoutButtonWrapper}
              shape={"round"}
              onClick={onLogout}
            ><b>로그아웃</b>
            </Button>
          </div>
        </>
        : <></>}
    </Row>
  );
};

export default NavigationBar;
