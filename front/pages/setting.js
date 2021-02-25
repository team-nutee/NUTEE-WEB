import React, { useMemo, useEffect } from 'react';
import axios from 'axios';
import { END } from 'redux-saga';
import { Row, Tabs, Divider } from 'antd';
import { SmileOutlined, SettingOutlined, BookOutlined, UnlockOutlined, UserOutlined, TagsOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import wrapper from '../store/configureStore';
import { LOAD_MAJOR_DATA_REQUEST, LOAD_CATEGORY_DATA_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import AppLayout from '../components/AppLayout';
import EditPassword from '../components/setting/EditPassword';
import EditProfileImage from '../components/setting/EditProfileImage';
import EditNickname from '../components/setting/EditNickname';
import EditMajor from '../components/setting/EditMajor';
import EditCategory from '../components/setting/EditCategory';

const { TabPane } = Tabs;

const setting = () => {
  const pageWrapper = useMemo(() => ({ outline: 'none', minWidth: '750px', maxWidth: '1000px', paddingTop: '70px' }), []);
  const tabsWrapper = useMemo(() => ({ background: '#f0faf5', borderRadius: '5px', border: '5px solid #c8e6d7', height: '100vh', color: '#005000', marginTop: '10px', fontWeight: 'bold', lineHeight: '20px' }), []);
  const tabPaneWrapper = useMemo(() => ({ color: 'black', fontWeight: 'normal' }), []);
  const setIconWrapper = useMemo(() => ({ marginRight: '5px' }), []);
  const dividerWrapper = useMemo(() => ({ fontSize: '20px' }), []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  return (
    <AppLayout>
      <Row style={pageWrapper}>
        <Divider orientation="left" style={dividerWrapper}>
          <SettingOutlined style={setIconWrapper} />
          설정
        </Divider>
        <Tabs tabPosition="left" type="card" style={tabsWrapper}>
          <TabPane
            tab={(
              <span>
                <SmileOutlined />
                프로필 사진 변경
              </span>
            )}
            key="1"
            style={tabPaneWrapper}
          >
            <EditProfileImage />
          </TabPane>
          <TabPane
            tab={(
              <span>
                <UserOutlined />
                닉네임 변경
              </span>
            )}
            key="2"
            style={tabPaneWrapper}
          >
            <EditNickname />
          </TabPane>
          <TabPane
            tab={(
              <span>
                <UnlockOutlined />
                비밀번호 변경
              </span>
            )}
            key="3"
            style={tabPaneWrapper}
          >
            <EditPassword />
          </TabPane>
          <TabPane
            tab={(
              <span>
                <TagsOutlined />
                카테고리 변경
              </span>
            )}
            key="4"
            style={tabPaneWrapper}
          >
            <EditCategory />
          </TabPane>
          <TabPane
            tab={(
              <span>
                <BookOutlined />
                전공 변경
              </span>
            )}
            key="5"
            style={tabPaneWrapper}
          >
            <EditMajor />
          </TabPane>
        </Tabs>
      </Row>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  console.log('getServerSideProps start_setting');
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_MAJOR_DATA_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_CATEGORY_DATA_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps start_setting');
  await context.store.sagaTask.toPromise();
});

export default setting;
