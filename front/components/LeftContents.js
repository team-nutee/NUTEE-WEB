import React from 'react';
import MyProfile from "../containers/MyProfile";
import {Col} from "antd";
import styled from 'styled-components';
import SchoolOrg from "./SchoolOrg";

const data1 = [
    {
        title: '아침햇살',
    },
    {
        title: 'C.O.L',
    },
    {
        title: '탈',
    },
    {
        title: '꾼',
    },
];
const data2 = [
    {
        title: '총학생회',
    },
    {
        title: '사회융합자율학부',
    },
    {
        title: 'IT융합자율학부',
    },
    {
        title: '인문융합자율학부',
    },
    {
        title: '미디어컨텐츠융합 자율학부',
    },
];
const data3 = [
    {
        title: '엣지',
    },
    {
        title: '작은짜이집',
    },
    {
        title: '어쩌구',
    },
    {
        title: '저쩌구',
    },
];
const data4 = [
    {
        title: 'S.OWL',
    },
    {
        title: '미디어센터',
    },
    {
        title: '회대알리',
    },
    {
        title: '어쩌구 당',
    },
];
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
    return (
        <Col span={span}>
            <Box>
                {me
                    ? <MyProfile target={me}/>
                    : <></>
                }
                <SchoolOrg data={data1} title={'동아리연합회'}/>
                <SchoolOrg data={data2} title={'성공회대학교 학생회'}/>
                <SchoolOrg data={data3} title={'소모임'}/>
                <SchoolOrg data={data4} title={'기타기구'}/>
            </Box>
        </Col>
    )
};
export default LeftContents;