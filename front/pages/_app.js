import React from 'react';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import Helmet from 'react-helmet';
import App, { Container } from 'next/app';
import AppLayout from '../components/AppLayout';
import reducer from '../reducers';
import rootSaga from '../sagas';
import {LOAD_USER_REQUEST} from "../reducers/user";

const Nutee = ({ Component, store, pageProps }) => {
    return (
        <Container>
        <Provider store={store}>
            <Helmet
                title="NUTEE"
                htmlAttributes={{ lang: 'ko' }}
                meta={[{
                    charset: 'UTF-8',
                }, {
                    name: 'viewport',
                    content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
                }, {
                    'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
                }, {
                    name: 'description', content: '성공회대 통합 커뮤니티 서비스',
                }, {
                    name: 'og:title', content: 'NUTEE',
                }, {
                    name: 'og:description', content: '성공회대 통합 커뮤니티 서비스',
                }, {
                    property: 'og:type', content: 'website',
                }, {
                    property: 'og:image', content: 'localhost:3000/favicon.ico',
                }]}
                link={[{
                    rel: 'icon',type:'image/png', href: 'favicon.ico',
                }, {
                    rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css',
                }, {
                    rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.css',
                }, {
                    rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.css',
                }, {
                    rel: 'stylesheet', href: 'https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css',
                }, {
                    rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css",
                }, {
                    rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Do+Hyeon|Nanum+Gothic&display=swap",
                }]}
            />
            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Provider>
        </Container>
    );
};


Nutee.propTypes = {
    Component: PropTypes.elementType.isRequired,
    store: PropTypes.object.isRequired,
    pageProps: PropTypes.object.isRequired,
};
//SSR 을 진행할 때 서버인 경우와 클라이언티인 경우를 두 가지 경우를 생각해야 하기 때문에 3항 연산자를 이용하여 구분을 해주어야한다.
Nutee.getInitialProps = async (context) => {
    console.log(context);
    const { ctx, Component } = context;
    let pageProps = {};
    const state = ctx.store.getState();
    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
    console.log('cookie',cookie);
    if(ctx.isServer && cookie){
        axios.defaults.headers.Cookie = cookie;
    }
    if(!state.user.me){
        ctx.store.dispatch({
            type: LOAD_USER_REQUEST,
        });
    }
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
};

const configureStore = (initialState, options) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : compose(
            applyMiddleware(...middlewares),
            !options.isServer && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
        );
    const store = createStore(reducer, initialState, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

export default withRedux(configureStore)(withReduxSaga(Nutee));