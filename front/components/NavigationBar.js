import React, { useCallback, useMemo } from "react";
import { Button, Col, Input, Row } from "antd";
import Link from "next/link";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";

const { Search } = Input;

const NavigationBar = ({ me }) => {
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
  const logoWrapper = useMemo(() => ({ float: "left", marginLeft: '7vw' }), []);
  const logoImgWrapper = useMemo(() => ({ height: '40px', width: '40px', marginLeft: '10px' }), []);
  const nuteeWrapper = useMemo(() => ({ float: "left", margin: '9.5px 10px 0px 0px' }), []);
  const nuteeAWrapper = useMemo(() => ({ fontFamily: 'Do Hyeon', color: '#13c276', fontSize: '40px' }), []);
  const searchWrapper = useMemo(() => ({ float: "left", marginLeft: '20px' }), []);
  const inputSearchWrapper = useMemo(() => ({ verticalAlign: 'middle', width : '250px', border: '3px solid #fff' }), []);
  const logoutWrapper = useMemo(() => ({ float: 'right', marginRight: '7vw', }), []);
  const logoutButtonWrapper = useMemo(() => ({ background: '#13c276', marginTop: '5px', marginRight: '10px', borderColor: '#fff', color: 'white' }), []);

  return (
    <Row style={wrapper}>
      <Col span={18}>
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
        {me ? (
          <>
            <div style={searchWrapper}>
              <Search
                placeholder="검색어를 입력하세요."
                allowClear
                onSearch={onSearch}
                style={inputSearchWrapper}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </Col>
      <Col span={6}>
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
      </Col>
    </Row>
  );
};

export default NavigationBar;
