import React from 'react';
import {List,Avatar} from 'antd';

const SchoolOrg = ({data,title}) => {
    return (
        <List
            style={{width: '220px', float: 'right', marginTop: '10px',backgroundColor:'white'}}
            itemLayout="horizontal"
            dataSource={data}
            header={title}
            bordered={true}
            renderItem={item => (
                <List.Item style={{marginLeft:'-40px',marginBottom:'-10px',marginTop:'-10px',display:'flex'}}>
                    <Avatar style={{marginLeft:'-20px'}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                    <div style={{marginLeft:'10px'}}>{item.title}</div>
                </List.Item>
            )}
        />
    )
};

export default SchoolOrg;