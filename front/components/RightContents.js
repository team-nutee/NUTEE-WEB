import React, {useEffect} from 'react';
import {Card, Col, List,Tabs} from "antd";
import Link from "next/link";
import {MEAL_URL, TARGET_URL} from "../static";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_NOTICE_REQUEST} from "../reducers/notice";
import Notice from "./Notice";

const foodData = [
    {
        title: '중식',
        content:'',
    },
    {
        title: '석식',
        content:'api 호출',
    },
    {
        title: '일품',
        content:'api 호출',
    },
];

const RightContents = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type:LOAD_NOTICE_REQUEST,
        });
        // fetch('https://skhu-test.sleepy-owl.com/life/meal/data',{
        //     method :'POST',
        //     headers:{
        //         'content-type':'application/json'
        //     },
        //     body:JSON.stringify({
        //         'url':'https://skhu.ac.kr/uni_zelkova/uni_zelkova_4_3_view.aspx?idx=374\u0026curpage=1'
        //     })
        // }).then(res=>res.json()).then(data=>console.log(data));
    },[]);

    return(
        <Col span={6} style={{minWidth: '270px'}}>
            {/*식단*/}
            {/*{<Card style={{marginRight:'10px', padding:'0px'}}>*/}
            {/*    <List style={{margin:'0px', padding:'0px'}}*/}
            {/*          grid={{gutter:1, column: 3 }}*/}
            {/*          dataSource={foodData}*/}
            {/*          renderItem={item => (*/}
            {/*              <List.Item>*/}
            {/*                  <Card title={item.title}>{item.content}</Card>*/}
            {/*              </List.Item>*/}
            {/*          )}*/}
            {/*    />*/}
            {/*</Card>}*/}
            {/*학교 공지사항*/}
            <Notice/>
            <Link href="https://github.com/team-nutee/NUTEE-WEB"><a target="_blank">Made by S.OWL</a></Link>
        </Col>
    )
};

export default RightContents;