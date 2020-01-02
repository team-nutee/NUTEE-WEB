import React, {useCallback} from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import {Col, Input,Card, Menu, Row, Item, List, Typography, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import LoginForm from '../containers/LoginForm';
import UserProfile from '../containers/UserProfile';
import Signup from "../containers/Signup";
import {LOG_OUT_REQUEST} from "../reducers/user";
import axios from "axios";

const noticeData = [
    '[학사] [영어학과] \'미국문학개론\' 대체과목 안내',
    '[수업] [사회과학부/사회융합자율학부사회학전공] 가족사회학 ...',
    '[학점] [케이씨대학교] 2019학년도 2학기 학점교류 안내',
    '[장학] [장학]2019-2학기 학부 인턴근로장학생 4차 신...',
    '[일반] 2019년 하반기 삼성 기회균등 특별채용 추천자 모...',
    '[행사] [중앙도서관] 2019년 9월. Issue Corn...',
];

const foodData = [
    {
        title: '중식',
        content:'api 호출',
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
const mealUrl= {
    "url":"https://skhu.ac.kr/uni_zelkova/uni_zelkova_4_3_view.aspx?idx=374\u0026curpage=1"
};

const meal = axios.post(`https://skhu-test.sleepy-owl.com/life/meal/data`, mealUrl);

const AppLayout = ({ children }) => {
    const { me } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    }, []);

    const onSearch = (value) => {
        // Router.push({ pathname: '/hashtag', query: { tag: value } }, `/hashtag/${value}`);
        console.log(meal);
    };

    return (
        <div>
            {/*메뉴바*/}
            <Row style={{background: '#13c276', minWidth: '1160px', height: '40px', padding: '5px'}}>
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
                                style={{color: "white"}}>프로필</b></a></Link></div> : <></>}
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
            {/*본문 내용*/}
            {me ?
                <Row style={{background: '#effbf5', paddingTop: '10px', minWidth:'1160px'}} type='flex' justify='center' gutter={8}>
                    <Col span={4}>
                        {me
                            ? <UserProfile></UserProfile>
                            : <></>}
                    </Col>
                    <Col style={{minWidth:'600px'}} span={10}>
                        {children}
                    </Col>
                    <Col span={6} style={{minWidth:'270px'}}>
                        {/*식단*/}
                        {/*<Card style={{marginRight:'10px', padding:'0px'}}>
                        <List style={{margin:'0px', padding:'0px'}}
                            grid={{ column: 3 }}
                            dataSource={foodData}
                            renderItem={item => (
                                <List.Item>
                                    <Card title={item.title}>{item.content}</Card>
                                </List.Item>
                            )}
                        />
                        </Card>*/}
                        {/*학교 공지사항*/}
                        <List style={{background:'white', marginRight:'10px', marginTop:'10px', borderRadius:'0', borderColor:'#e6e6e6'}}
                            header={<div>학교 공지사항</div>}
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
                </Row>
                : <Signup></Signup>
            }
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;