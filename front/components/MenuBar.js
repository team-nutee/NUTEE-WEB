import React, { useCallback, useMemo } from 'react';
import { Button, Col, Input, Row } from "antd";
import Link from "next/link";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";
import logo from '../images/nutee_circle.png'

const MenuBar = ({ me }) => {
    const onSearch = (text) => {
        Router.push({ pathname: '/search', query: { text: text } }, `/search/${text}`);
    };

    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST
        });
    }, []);

    const divWrapper = useMemo(() => ({ background: '#f0faf5', height: '65px', paddingTop: '15px', position: 'fixed', top: '0', zIndex: '1', display: 'inline-block', width: '100%', }), []);
    const rowWrapper = useMemo(() => ({ minWidth: '320px' }), []);
    const row2Wrapper = useMemo(() => ({ minWidth: '250px' }), []);
    const logoDivWrapper = useMemo(() => ({ float: "left", marginLeft: '7vw' }), []);
    const logoImgWrapper = useMemo(() => ({ height: '40px', width: '40px', marginLeft: '10px' }), []);
    const nuteeDivWrapper = useMemo(() => ({ float: "left", margin: '9.5px 10px 0px 0px' }), []);
    const nuteeAWrapper = useMemo(() => ({ color: '#13c276', fontSize: '40px' }), []);
    const profileWrapper = useMemo(() => ({ float: "left", marginRight: '17px', marginTop: '11px' }), []);
    const profileAWrapper = useMemo(() => ({ color: '#13c276', fontSize: '25px' }), []);
    const searchDivWrapper = useMemo(() => ({ float: "left", marginLeft: '20px', marginTop: '4px' }), []);
    const inputSearchWrapper = useMemo(() => ({ verticalAlign: 'middle' }), []);
    const buttonDivWrapper = useMemo(() => ({ float: 'right', marginRight: '7vw', }), []);
    const buttonWrapper = useMemo(() => ({ background: '#13c276', marginTop: '5px', marginRight: '10px', borderColor: '#fff', color: 'white' }), []);

    return (
        <div style={divWrapper} >
            <Row style={rowWrapper}>
                <Col span={18}>
                    <Row style={row2Wrapper}>
                        <div style={logoDivWrapper}>
                            <Link href="/">
                                <a >
                                    <img style={logoImgWrapper} src={logo} alt='nutee' />
                                </a>
                            </Link>
                        </div>
                        <div style={nuteeDivWrapper}>
                            <Link href="/">
                                <a>
                                    <b style={nuteeAWrapper}>NUTEE</b>
                                </a>
                            </Link>
                        </div>
                        {me ?
                            <>
                                <div style={profileWrapper}>
                                    <Link href="/profile">
                                        <a>
                                            <b style={profileAWrapper}>프로필</b>
                                        </a>
                                    </Link>
                                </div>
                                <div style={searchDivWrapper}>
                                    <Input.Search
                                        placeholder={"검색어를 입력하세요."}
                                        style={inputSearchWrapper}
                                        onSearch={onSearch}
                                    />
                                </div>
                            </>
                            : <></>}
                    </Row>
                </Col>
                <Col span={6}>
                    {
                        me
                            ?
                            <div style={buttonDivWrapper}>
                                <Button style={buttonWrapper} shape={"round"}
                                    onClick={onLogout}>
                                    <b>로그아웃</b>
                                </Button>
                            </div>
                            :
                            <></>
                    }
                </Col>
            </Row>
        </div>
    )
};

export default MenuBar;