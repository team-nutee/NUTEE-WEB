import React from 'react';
import MyProfile from "../containers/MyProfile";
import { Col } from "antd";
import {useSelector} from "react-redux";
import ProfileEditModal from "./ProfileEditModal";
import PwEditModal from "./PwEditModal";
import styled from "styled-components";

const Box = styled.div`
    position: sticky;
    top: 50px;
    height: 93vh;
    overflow: scroll;
    ::-webkit-scrollbar {
       display: none;
    }
`;

const LeftProfile =({span})=>{
    const {me} = useSelector(state => state.user);
    return(
        <>
            <Col span={span}>
                <Box>
                {me
                    ?
                    <>
                        <MyProfile target={me}/>
                        <ProfileEditModal/>
                        <PwEditModal/>
                    </>
                    :
                    <></>
                }
                </Box>
            </Col>
        </>
    )
};
export default LeftProfile;