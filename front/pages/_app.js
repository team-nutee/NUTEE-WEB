import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import wrapper from '../store/configureStore';

const Nutee = ({ Component }) => {
    return (
        <>
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
                    rel: 'icon', type: 'image/png', href: 'favicon.ico',
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
            <Component />
        </>
    );
};

Nutee.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export function reportWebVitals(metric) {
    console.log(metric);
}

export default wrapper.withRedux(Nutee);