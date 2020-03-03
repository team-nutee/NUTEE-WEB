import React from 'react';
import {List, Tabs} from "antd";
import {useSelector} from "react-redux";
const { TabPane } = Tabs;

const Notice = () =>{
    const {noticeContents,noticeHrefs} = useSelector(state => state.notice);
    const notice1 = noticeHrefs[0];
    return(
        <Tabs size='small' type="card">
            <TabPane tab="학사" key="1">
                <List style={{
                    background: 'white',
                    borderRadius: '0',
                    borderColor: '#e6e6e6'
                }}
                      bordered
                      dataSource={[noticeContents[0],noticeHrefs[0]]}
                      renderItem={item => (
                          <List.Item>
                              <a style={{textDecoration:'none', color:'black',fontWeight:'10'}} href={item[1]} target='_blank'>{item[0]}</a>
                          </List.Item>
                      )}


                />
            </TabPane>
            <TabPane tab="수업" key="2">
                <List style={{
                    background: 'white',
                    borderRadius: '0',
                    borderColor: '#e6e6e6'
                }}
                      bordered
                      dataSource={noticeContents[1]}
                      renderItem={item => (
                          <List.Item>
                              <a href={noticeHrefs[1]}>{item}</a>
                          </List.Item>
                      )}
                />
            </TabPane>
            <TabPane tab="학점" key="3">
                <List style={{
                    background: 'white',
                    borderRadius: '0',
                    borderColor: '#e6e6e6'
                }}
                      bordered
                      dataSource={noticeContents[2]}
                      renderItem={item => (
                          <List.Item>
                              <a href={noticeHrefs[2]}>{item}</a>
                          </List.Item>
                      )}
                />
            </TabPane>
            <TabPane tab="장학" key="4">
                <List style={{
                    background: 'white',
                    borderRadius: '0',
                    borderColor: '#e6e6e6'
                }}
                      bordered
                      dataSource={noticeContents[3]}
                      renderItem={item => (
                          <List.Item>
                              <a href={noticeHrefs[3]}>{item}</a>
                          </List.Item>
                      )}
                />
            </TabPane>
            <TabPane tab="일반" key="5">
                <List style={{
                    background: 'white',
                    borderRadius: '0',
                    borderColor: '#e6e6e6'
                }}
                      bordered
                      dataSource={noticeContents[4]}
                      renderItem={item => (
                          <List.Item>
                              <a href={noticeHrefs[4]}>{item}</a>
                          </List.Item>
                      )}
                />
            </TabPane>
            <TabPane tab="행사" key="6">
                <List style={{
                    background: 'white',
                    borderRadius: '0',
                    borderColor: '#e6e6e6'
                }}
                      bordered
                      dataSource={noticeContents[5]}
                      renderItem={item => (
                          <List.Item>
                              <a href={noticeHrefs[5]}>{item}</a>
                          </List.Item>
                      )}
                />
            </TabPane>
        </Tabs>
    )
};
export default Notice;