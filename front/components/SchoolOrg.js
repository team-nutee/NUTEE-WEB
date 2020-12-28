import React, { useMeme } from 'react';
import { List, Avatar } from 'antd';

const SchoolOrg = ({ data, title }) => {
    const listWrapper = useMemo(() => ({ width: '220px', float: 'right', marginTop: '10px', backgroundColor: 'white' }), []);
    const listItemWrapper = useMemo(() => ({ marginLeft: '-40px', marginBottom: '-10px', marginTop: '-10px', display: 'flex' }), []);
    const avatarWrapper = useMemo(() => ({ marginLeft: '-20px' }), []);
    const divWrapper = useMemo(() => ({ marginLeft: '10px' }), []);

    return (
        <List
            style={listWrapper}
            itemLayout="horizontal"
            dataSource={data}
            header={title}
            bordered={true}
            renderItem={item => (
                <List.Item style={listItemWrapper}>
                    <Avatar style={avatarWrapper} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <div style={divWrapper}>{item.title}</div>
                </List.Item>
            )}
        />
    )
};

export default SchoolOrg;