import React, { useEffect, useMemo } from 'react';
import Link from "next/link";
import { useDispatch } from "react-redux";
import {LOAD_NOTICE_REQUEST} from "../../reducers/notice";
import { TARGET_URL } from "../../static";
import { Col, Row } from "antd";
import MyProfile from "../profiles/MyProfile";
import Notice from "../Notice";
import styled from 'styled-components';

const Box = styled.div`
    position: sticky;
    top: 50px;
    height: 93vh;
    overflow: scroll;
    ::-webkit-scrollbar {
       display: none;
    }
`;

const LeftContents = ({me, span}) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type:LOAD_NOTICE_REQUEST,
        });
    },[]);

    //const rowWrapper = useMemo(() => ({ margin : 'auto 0',  }), []);
    const imgWrapper = useMemo(() => ({ width:'100%',marginTop:'10px' }), []);

        return (
                <Col span={span} gutter={8}>
            <Box>
                <Row gutter={8} >
                    { me ? <MyProfile target={me}/>:<></> }
                </Row>
                <Row gutter={8}>
                    <Notice/>
                </Row>
                <Row gutter={8}>
                    <img style={imgWrapper} src={`${TARGET_URL}/settings/poster1.png`}/>
                <Link href="https://github.com/team-nutee/NUTEE-WEB"><a target="_blank">Made by S.OWL</a></Link>
                </Row>
            </Box>
        </Col>
    )
};
export default LeftContents;