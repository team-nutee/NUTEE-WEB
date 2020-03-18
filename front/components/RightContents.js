import React, {useEffect} from 'react';
import {Card, Col, List,Tabs} from "antd";
import Link from "next/link";
import {MEAL_URL, TARGET_URL} from "../static";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_NOTICE_REQUEST} from "../reducers/notice";
import Notice from "./Notice";
import styled from "styled-components";

const Box=styled.div`
    position: sticky;
    top: 50px;
    height: 93vh;
    overflow: scroll;
    ::-webkit-scrollbar {
       display: none;
    }
`;

const RightContents = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type:LOAD_NOTICE_REQUEST,
        });
    },[]);

    return(
        <Col span={6} style={{minWidth: '270px'}}>
            <Box>
            <Notice/>
            <img style={{width:'100%',marginTop:'10px'}} src={`${TARGET_URL}/settings/poster1.png`}/>
            <Link href="https://github.com/team-nutee/NUTEE-WEB"><a target="_blank">Made by S.OWL</a></Link>
            </Box>
        </Col>
    )
};

export default RightContents;