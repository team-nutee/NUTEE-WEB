import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { LogoWrapper, LogoImgWrapper, NuteeWrapper, NuteeAWrapper, NuteeMenu, MenuBtn, MenuList, NuteeRow } from "./styles";
import Link from "next/link";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../../../reducers/user";
import useInput from '../../../hooks/useInput';

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
  
  /* 검색 */
  const searchWrapper = useMemo(() => ({ float: "left", margin: '0 5px 0 20px', width: '200px' }), []);
  const showSearchWrapper = useMemo(() => ({ fontSize: '30px', color: '#13c276', marginTop: '2px' }), []);

  return (
    <NuteeRow>
      <LogoWrapper>
        <Link href="/">
          <a>
            <LogoImgWrapper src={'/nutee_circle.png'} alt="nutee" />
          </a>
        </Link>
      </LogoWrapper>
      <NuteeWrapper>
        <Link href="/">
          <a>
            <NuteeAWrapper>NUTEE</NuteeAWrapper>
          </a>
        </Link>
      </NuteeWrapper>
      {me ?
        <>
          {showMenu ?
            <>
              <NuteeMenu>
                <MenuList>
                  <Input
                  placeholder="검색어를 입력하세요."
                  allowClear
                  value={searchInput}
                  style={searchWrapper}
                  onChange={onChangeSearchInput}
                /><SearchOutlined style={showSearchWrapper} onClick={onSearch} />
                </MenuList>
                <MenuList><Link href="/profile"><a>프로필</a></Link></MenuList>
                <MenuList>학사</MenuList>
                <MenuList>수업</MenuList>
                <MenuList>학점</MenuList>
                <MenuList>장학</MenuList>
                <MenuList>일반</MenuList>
                <MenuList>행사</MenuList>
                <MenuList onClick={onLogout}>로그아웃</MenuList>
              </NuteeMenu>
            </> :
            <>
            </>
          }
            <MenuBtn onClick={toggleMenu}/>
        </>
        : <></>}
    </NuteeRow>
  );
};

export default MobileNavigationBar;