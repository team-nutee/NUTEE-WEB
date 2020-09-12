import React, { useCallback } from 'react';
import { Button, Col, Input, Row } from "antd";
import Link from "next/link";
import Router from "next/router";
import LoginForm from "./LoginForm";
import { useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";
import { TARGET_URL } from "../static";
import styled from "styled-components";
import theme from '../style/theme';

const MenuBar = ({ me }) => {
    const onSearch = (text) => {
        Router.push({ pathname: '/search', query: { text: text } }, `/search/${text}`);
    };
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);
    return (

        <div style={{
            background: '#f0faf5',
            height: '65px',
            paddingTop: '10px',
            position: 'fixed',
            top: '0',
            zIndex: '1',
            display: 'inline-block',
            width: '100%',
        }}  >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <div style={{ float: "left", marginLeft: '7vw', marginRight: '10px' }}>
                        <Link href="/" prefetch>
                            <a>
                                <img
                                    style={{ height: '40px', width: '40px' }}
                                    src={`${TARGET_URL}/settings/nutee_circle.png`} />
                            </a>
                        </Link>
                    </div>
                    <div style={{ float: "left", margin: '12px 10px 0px 0px'}}>
                        <Link href="/" prefetch>
                            <a>
                                <b style={{ color: '#13c276', fontSize: '40px' }}>NUTEE</b>
                            </a>
                        </Link>
                    </div>
                    {me ?
                        <div style={{ float: "left", marginRight: '20px', marginTop: '11px' }}><Link
                            href="/profile" prefetch><a>
                                <b style={{ color: '#13c276', fontSize: '25px' }}>프로필</b></a></Link></div> : <></>}
                    {/*<div style={{float: "left", marginRight: '20px', marginTop: '4px'}}><Link*/}
                    {/*    href="/chat" prefetch><a><b*/}
                    {/*    style={{color: "white"}}>채팅</b></a></Link></div>*/}

                    <div style={{ float: "left", marginLeft: '20px', marginTop: '4px' }}>
                        {me ?
                            <Input.Search
                                placeholder={"검색어를 입력하세요."}
                                style={{ verticalAlign: 'middle' }}
                                onSearch={onSearch}
                            />
                            :
                            <></>
                        }
                    </div>
                </Col>
                <Col span={12}>
                    {
                        me
                            ? <div style={{ float: 'right', marginRight: '7vw' }}>
                                <Button size={"small"}
                                    style={{ marginTop: '9px', marginRight: '10px', borderColor: '#13c276' }}
                                    shape={"round"}
                                    onClick={onLogout}>
                                    <b style={{ color: '#13c276' }}>로그아웃</b>
                                </Button>
                            </div>
                            : <div style={{ float: 'right', marginRight: '7vw' }}><LoginForm /></div>
                    }</Col>
            </Row>
        </div>

    )
};

export default MenuBar;