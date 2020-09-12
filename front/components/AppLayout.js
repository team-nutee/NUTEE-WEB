import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Col, Input, Card, Menu, Row, Item, List, Typography, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../containers/LoginForm';
import MyProfile from '../containers/MyProfile';
import Signup from "../containers/Signup";
import { LOG_OUT_REQUEST } from "../reducers/user";
import axios from "axios";
import MenuBar from "../containers/MenuBar";
import LeftContents from "./LeftContents";
import MainContents from "./MainContents";
import RightContents from "./RightContents";
import styled from 'styled-components';
import theme from '../style/theme';

const AppLayout = ({ children }) => {
    const { me } = useSelector(state => state.user);
    return (
        <>
            <div className={'main'} style={{ minHeight: '100vh', background: '#f0faf5'}}>
                {/*메뉴바*/}
                <MenuBar me={me} />
                {/*본문 내용*/}
                {me ?
                    <Row style={{ paddingTop: '50px', width: '100%' }} type='flex' justify='center' gutter={8}>
                        {children}
                    </Row>
                    :
                    <Signup />
                }
            </div>
            <style jsx>
                {
                    `
                    div {
                        font-family:"Do Hyeon", sans-serif;
                        font-weight: 200;
                    }
                   `
                }
            </style>

        </>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;