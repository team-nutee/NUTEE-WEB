import React, {useCallback} from 'react';
import {Button, Col, Input, Row} from "antd";
import Link from "next/link";
import LoginForm from "./LoginForm";
import {useDispatch} from "react-redux";
import {LOG_OUT_REQUEST} from "../reducers/user";

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
    return(
        <Row style={{background: '#13c276',width:'100%', minWidth: '1160px', height: '40px', padding: '5px'}}>
            <Col span={8}>
                <div style={{float: "right", marginRight: '20px',minWidth: '300px'}}>
                    <div style={{float: "left", marginRight: '20px'}}>
                        <Link href="/">
                            <a>
                                <img
                                    style={{height: '30px', width: '30px'}}
                                    src='http://localhost:9425/settings/nutee_circle.png'/>
                            </a>
                        </Link>
                    </div>
                    <div style={{float: "left", marginRight: '20px', marginTop: '4px'}}><Link href="/"><a><b
                        style={{color: "white"}}>누티</b></a></Link></div>
                    {me ?
                        <div style={{float: "left", marginRight: '20px', marginTop: '4px'}}><Link
                            href="/profile"><a><b
                            style={{color: "white"}}>프로필</b></a></Link></div> : <></>
                    }
                    <div style={{float: "left", marginRight: '20px', marginTop: '4px'}}><Link
                        href="/chat"><a><b
                        style={{color: "white"}}>채팅</b></a></Link></div>
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
                </div>
            </Col>
            <Col span={14}>
            </Col>
            <Col span={2}>{
                me
                    ? <div style={{float: "right"}}>
                        <Button size={"small"}
                                style={{marginTop: '4px', marginRight:'10px'}}
                                shape={"round"}
                                onClick={onLogout}>
                            <b style={{color: '#13c276'}}>로그아웃</b>
                        </Button>
                    </div>
                    : <div style={{float: "right"}}><LoginForm></LoginForm></div>
            }</Col>
        </Row>
    )
};

export default MenuBar;