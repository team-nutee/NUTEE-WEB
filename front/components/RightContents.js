import React from 'react';
import {Card, Col, List} from "antd";
import Link from "next/link";
import axios from "axios";

const mealUrl= {
    "url":"https://skhu.ac.kr/uni_zelkova/uni_zelkova_4_3_view.aspx?idx=374\u0026curpage=1"
};

const meal = axios.post(`https://skhu-test.sleepy-owl.com/life/meal/data`, mealUrl,{
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

const noticeData = [
    '[학사] [영어학과] \'미국문학개론\' 대체과목 안내',
    '[수업] [사회과학부/사회융합자율학부사회학전공] 가족사회학 ...',
    '[학점] [케이씨대학교] 2019학년도 2학기 학점교류 안내',
    '[장학] [장학]2019-2학기 학부 인턴근로장학생 4차 신...',
    '[일반] 2019년 하반기 삼성 기회균등 특별채용 추천자 모...',
    '[행사] [중앙도서관] 2019년 9월. Issue Corn...',
];

const RightContents = () => {
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
            <List style={{
                background: 'white',
                marginRight: '10px',
                marginTop: '10px',
                borderRadius: '0',
                borderColor: '#e6e6e6'
            }}
                  header='학교 공지사항'
                  bordered
                  dataSource={noticeData}
                  renderItem={item => (
                      <List.Item>
                          {item}
                      </List.Item>
                  )}
            />
            <Link href="https://github.com/MoonHKLee/react-nodebird/"><a target="_blank">Made by
                MoonHKLee</a></Link>
        </Col>
    )
};

export default RightContents;