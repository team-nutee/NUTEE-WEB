import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Input, Row, Popover } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import Link from "next/link";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { logoutRequestAction } from '../reducers/user';
import useInput from '../hooks/useInput';

const NavigationBar = ({ me }) => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  const onSearch = useCallback(() => {
    if (searchInput) {
      Router.push(`/search/${searchInput}`);
    }
  }, [searchInput]);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  useEffect(function onSearchWidth() {
    if ((window.innerWidth || document.body.clientWidth) > 700) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    } 
    window.addEventListener("resize", onSearchWidth);
    return () => {
      window.removeEventListener("resize", onSearchWidth);
    };
  });

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

  const content = (
    <>
      <Input
        placeholder="검색어를 입력하세요."
        allowClear
        style={searchWrapper}
      /><SearchOutlined style={showSearchWrapper} onClick={onSearch} />
    </>
  );

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
                value={searchInput}
                style={searchWrapper}
                onChange={onChangeSearchInput}
              /><SearchOutlined style={showSearchWrapper} onClick={onSearch} />
            </> :
            <>
              <Popover placement="bottom" content={content} trigger="click">
                <SearchOutlined style={showSearchWrapper} /></Popover>
            </>
          }
          <div style={logoutWrapper}>
            <Button
              style={logoutButtonWrapper}
              shape={"round"}
              onClick={onLogOut}
            ><b>로그아웃</b>
            </Button>
          </div>
        </>
        : <></>
      }
    </Row>
  );
};

export default NavigationBar;
