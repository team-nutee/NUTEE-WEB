import React, { useMemo, useEffect } from 'react';
import { END } from 'redux-saga';
import { Row, Tabs, Divider } from 'antd';
import { SmileOutlined, SettingOutlined, BookOutlined, UnlockOutlined, UserOutlined, TagsOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import wrapper from '../store/configureStore';
import { LOAD_MAJOR_DATA_REQUEST, LOAD_CATEGORY_DATA_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import AppLayout from '../components/AppLayout';
import EditPassword from '../components/setting/EditPassword';
import EditProfileImage from '../components/setting/EditProfileImage';
import EditNickname from '../components/setting/EditNickname';
import EditMajor from '../components/setting/EditMajor';
import EditCategory from '../components/setting/EditCategory';
import SettingTabs from '../components/setting/SettingWrapper';

const { TabPane } = Tabs;

const setting = () => {
  const pageWrapper = useMemo(() => ({ outline: 'none', height: '100vh', width: '70vw', minWidth: '750px', maxWidth: '1000px', paddingTop: '65px' }), []);
  const tabsWrapper = useMemo(() => ({ background: '#f0faf5', borderRadius: '5px', border: '5px solid #c8e6d7', height: '80vh', color: '#005000', marginTop: '10px', fontWeight: 'bold', lineHeight: '20px' }), []);
  const tabPaneWrapper = useMemo(() => ({ color: 'black', fontWeight: 'normal' }), []);
  const setIconWrapper = useMemo(() => ({ marginRight: '5px' }), []);
  const dividerWrapper = useMemo(() => ({ fontSize: '20px' }), []);
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  return (
    <>
      { me
        ? (
          <AppLayout>
            <Row style={pageWrapper}>
              <Divider orientation="left" style={dividerWrapper}>
                <SettingOutlined style={setIconWrapper} />
                설정
              </Divider>
              <SettingTabs tabPosition="left" type="card" style={tabsWrapper}>
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
              </SettingTabs>
            </Row>
          </AppLayout>
        ) : <></> }
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
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
  await context.store.sagaTask.toPromise();
});

export default setting;
