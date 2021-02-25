import styled from 'styled-components';
import { Row } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

export const NuteeRow = styled(Row)`
    background: #f0faf5;
    height: 65px; 
    padding-top: 15px; 
    position: fixed; 
    top: 0; 
    z-index: 5;
    width: 100%;
    justify-content: space-between;
`;

//로고
export const LogoWrapper = styled.div`
    float: left;
    margin-left: 7vw;
`;

export const LogoImgWrapper = styled.img`
    height: 40px;
    width: 40px;
    margin: -1px 3px 0 5px;
`;

//NUTEE

export const NuteeWrapper = styled.div`
    float: left;
    margin: 10px 10px 0px 0px;
`;

export const NuteeAWrapper = styled.b`
    font-family: Do Hyeon; 
    color: #13c276; 
    font-size: 40px;
`;

//Menu

export const NuteeMenu = styled.ul`
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    width: 100%;
    background: #f0faf5;
    padding-bottom: 20px;
    padding-left: 0px;
`;

export const MenuList = styled.li`
    padding: 8px 12px;
    list-style: none;
    color: #13c276;
    width: 90%;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #b4efc8;
    font-style: 'Do Hyeon';
    font-size: 17px;
    font-weight: 600;
    text-decoration: none;
    text-align: center;

    & a {
        color: #13c276;
    }
`;

export const MenuBtn = styled(UnorderedListOutlined)`
    display: block;
    position: absolute;
    top: 15px;
    right: 25px;
    margin-right: 10px; 
    font-size: 35px;
    color: #13c276;

`;

