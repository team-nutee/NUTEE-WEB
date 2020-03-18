import React from 'react';
import {List,Avatar} from 'antd';

const data = [
    {
        title: '동아리연합회',
    },
    {
        title: '성공회대학교 총학생회',
    },
    {
        title: 'S.owl',
    },
    {
        title: '소모임',
    },
];

const SchoolOrg = () => {
    return (
        <List
            style={{width: '220px', float: 'right', marginTop: '10px',backgroundColor:'white'}}
            itemLayout="horizontal"
            dataSource={data}
            bordered={true}
            renderItem={item => (
                <List.Item style={{marginLeft:'-40px',display:'flex'}}>
                    <Avatar style={{marginLeft:'-20px'}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                    <div style={{marginLeft:'10px'}}>{item.title}</div>
                </List.Item>
            )}
        />
    )
};

export default SchoolOrg;