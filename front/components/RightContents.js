import React, {useEffect} from 'react';
import {Card, Col, List,Tabs} from "antd";
import Link from "next/link";
import axios from "axios";
import {MEAL_URL, TARGET_URL} from "../static";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_NOTICE_REQUEST} from "../reducers/notice";

const { TabPane } = Tabs;

const meal = axios.post(`https://skhu-test.sleepy-owl.com/life/meal/data`, MEAL_URL,{
    headers:{
        'Access-Control-Allow-Origin' : '*'
    }
});

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
    const {noticeContents} = useSelector(state => state.notice);
    useEffect(()=>{
        dispatch({
            type:LOAD_NOTICE_REQUEST,
        })
    },[]);
    return(
        <Col span={6} style={{minWidth: '270px'}}>
            {/*식단*/}
            {<Card style={{marginRight:'10px', padding:'0px'}}>
                <List style={{margin:'0px', padding:'0px'}}
                      grid={{gutter:1, column: 3 }}
                      dataSource={foodData}
                      renderItem={item => (
                          <List.Item>
                              <Card title={item.title}>{item.content}</Card>
                          </List.Item>
                      )}
                />
            </Card>}
            {/*학교 공지사항*/}
            <Tabs size='small' style={{marginTop:'10px'}} type="card">
                <TabPane tab="학사" key="1">
                    <List style={{
                        background: 'white',
                        borderRadius: '0',
                        borderColor: '#e6e6e6'
                    }}
                          bordered
                          dataSource={[]}
                          renderItem={item => (
                              <List.Item>
                                  {item}
                              </List.Item>
                          )}
                    />
                </TabPane>
                <TabPane tab="수업" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="학점" key="3">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="장학" key="4">
                    Content of Tab Pane 4
                </TabPane>
                <TabPane tab="일반" key="5">
                    Content of Tab Pane 5
                </TabPane>
                <TabPane tab="행사" key="6">
                    Content of Tab Pane 6
                </TabPane>
            </Tabs>
            <Link href="https://github.com/team-nutee/NUTEE-WEB"><a target="_blank">Made by S.OWL</a></Link>
        </Col>
    )
};

export default RightContents;