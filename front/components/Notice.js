import React, { useEffect, useMemo } from 'react';
import { List, Tabs } from "antd";
import { useSelector } from "react-redux";
const { TabPane } = Tabs;

const list = [{
    tab: '학사',
    key: 0
}, {
    tab: '수업',
    key: 1
}, {
    tab: '학점',
    key: 2
}, {
    tab: '장학',
    key: 3
}, {
    tab: '일반',
    key: 4
}, {
    tab: '행사',
    key: 5
}];

const Notice = () => {
    const { noticeContents, noticeHrefs } = useSelector(state => state.notice);

    const listWrapper = useMemo(() => ({ background: 'white', borderRadius: '0', borderColor: '#e6e6e6' }), []);
    const listItemAWrapper = useMemo(() => ({ textDecoration: 'none', color: 'black', fontWeight: '10', marginLeft: '-40px' }), []);
    const tabWrapper = useMemo(() => ({ maxWidth: '350px' }), []);

    return (
        <Tabs size='small' type="card" style={tabWrapper}>
            {list.map((v) => (
                <TabPane tab={v.tab} key={v.key}>
                    <List style={listWrapper}
                        bordered
                        dataSource={noticeContents[v.key]}
                        renderItem={(item, i) => (
                            <List.Item>
                                <a style={listItemAWrapper} href={noticeHrefs[v.key][i]} target='_blank'>{item}</a>
                            </List.Item>
                        )}
                    />
                </TabPane>
            ))}
        </Tabs>
    )
};
export default Notice;