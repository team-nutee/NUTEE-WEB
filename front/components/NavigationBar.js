import React, { useCallback, useMemo, useState } from "react";
import { Button, Input, Row } from "antd";
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import Link from "next/link";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";

const NavigationBar = ({ me }) => {
  const [showSearch, setShowSearch] = useState(false);
  const onShowSearch = () => setShowSearch(true);
  const onCloseSearch = () => setShowSearch(false);

  const onSearch = text => {
    Router.push(
      { pathname: "/search", query: { text: text } },
      `/search/${text}`
    );
  };

  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  const wrapper = useMemo(() => ({ background: '#f0faf5', height: '65px', paddingTop: '15px', position: 'fixed', top: '0', zIndex: '5', width: '100%', }), []);
  /* 로고 */
  const logoWrapper = useMemo(() => ({ float: "left", marginLeft: '7vw' }), []);
  const logoImgWrapper = useMemo(() => ({ height: '40px', width: '40px', marginLeft: '10px' }), []);

  /* NUTEE */
  const nuteeWrapper = useMemo(() => ({ float: "left", margin: '9.5px 10px 0px 0px' }), []);
  const nuteeAWrapper = useMemo(() => ({ fontFamily: 'Do Hyeon', color: '#13c276', fontSize: '40px' }), []);

  /* 검색 */
  const searchWrapper = useMemo(() => ({ float: "left", margin: '0 5px 0 20px', width: '200px' }), []);
  const showSearchWrapper = useMemo(() => ({ fontSize: '30px', color: '#005000' }), []);
  const closeIconWrapper = useMemo(() => ({ padding: '10px' }), []);

  /* 로드아웃 */
  const logoutWrapper = useMemo(() => ({ float: 'right', marginRight: '7vw', }), []);
  const logoutButtonWrapper = useMemo(() => ({ background: '#13c276', marginTop: '5px', marginRight: '10px', borderColor: '#fff', color: 'white' }), []);

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
            {showSearch ?
              <>
                <Input
                  placeholder="검색어를 입력하세요."
                  allowClear
                  style={searchWrapper}
                /><SearchOutlined style={showSearchWrapper} onClick={onSearch} /><CloseCircleOutlined onClick={onCloseSearch} style={closeIconWrapper} />
              </> : <SearchOutlined style={showSearchWrapper} onClick={onShowSearch} />}
          </>
        : <></>}
        {me ? (
          <div style={logoutWrapper}>
            <Button
              style={logoutButtonWrapper}
              shape={"round"}
              onClick={onLogout}
            >
              <b>로그아웃</b>
            </Button>
          </div>
        ) : (
            <></>
          )}
    </Row>
  );
};

export default NavigationBar;
