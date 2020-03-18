import React, {useCallback} from 'react';
import {Button, Col, Input, Row} from "antd";
import Link from "next/link";
import LoginForm from "./LoginForm";
import {useDispatch} from "react-redux";
import {LOG_OUT_REQUEST} from "../reducers/user";
import {TARGET_URL} from "../static";

const MenuBar = ({me}) => {
    const onSearch = (value) => {
        // Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
    };
    const dispatch = useDispatch();
    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);
    return (
        <div style={{background: '#13c276', height: '40px', padding: '5px',position:'fixed',top:'0',minWidth:'1130px',width:'100%',zIndex:'1'}}>
            <div style={{display: 'inline-block', marginRight: '20px',width:'100%', minWidth: '320px'}}>
                <div style={{float: "left",marginLeft:'12%', marginRight: '20px'}}>
                    <Link href="/" prefetch>
                        <a>
                            <img
                                style={{height: '30px', width: '30px'}}
                                src={`${TARGET_URL}/settings/nutee_circle.png`}/>
                        </a>
                    </Link>
                </div>
                <div style={{float: "left", marginRight: '20px', marginTop: '4px'}}>
                    <Link href="/" prefetch>
                        <a>
                            <b style={{color: "white",fontSize:'20px'}}>홈</b>
                        </a>
                    </Link>
                </div>

                {/*<div style={{float: "left", marginRight: '20px', marginTop: '4px'}}><Link href="/" prefetch><a><b*/}
                {/*    style={{color: "white"}}>누티</b></a></Link></div>*/}
                {me ?
                    <div style={{float: "left", marginRight: '20px', marginTop: '4px'}}><Link
                        href="/profile" prefetch><a><b
                        style={{color: "white",fontSize:'20px'}}>프로필</b></a></Link></div> : <></>
                }
                {/*<div style={{float: "left", marginRight: '20px', marginTop: '4px'}}><Link*/}
                {/*    href="/chat" prefetch><a><b*/}
                {/*    style={{color: "white"}}>채팅</b></a></Link></div>*/}
                <div style={{float: "left", marginTop: '3px'}}>
                    {me ?
                        <Input.Search
                            size={"small"}
                            placeholder={"input search text"}
                            style={{verticalAlign: 'middle'}}
                            onSearch={onSearch}
                        />
                        :
                        <></>
                    }
                </div>
                {
                    me
                        ? <div style={{float:'right', marginRight:'7%'}}>
                            <Button size={"small"}
                                    style={{marginTop: '4px', marginRight: '10px'}}
                                    shape={"round"}
                                    onClick={onLogout}>
                                <b style={{color: '#13c276'}}>로그아웃</b>
                            </Button>
                        </div>
                        : <div style={{float:'right'}}><LoginForm></LoginForm></div>
                }
            </div>
        </div>
    )
};

export default MenuBar;