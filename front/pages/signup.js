/* eslint-disable consistent-return */ /* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Select from 'react-select';
import { END } from 'redux-saga';
import { Form, Input, Checkbox, Button, Row, Col, Modal } from 'antd';
import { IdcardOutlined, LockOutlined, UserOutlined, MailOutlined, SafetyOutlined } from '@ant-design/icons';
import Link from 'next/link';
import wrapper from '../store/configureStore';
import {
  LOAD_MY_INFO_REQUEST, CHECK_ID_REQUEST, CHECK_NICKNAME_REQUEST, SEND_OPT_REQUEST,
  CHECK_DUPLICATE_EMAIL_REQUEST, CHECK_OTP_REQUEST, SIGN_UP_REQUEST,
} from '../reducers/user';
import { LOAD_CATEGORY_DATA_REQUEST, LOAD_MAJOR_DATA_REQUEST } from '../reducers/post';
import useInput from '../hooks/useInput';
import Terms from '../components/Terms';
import Footer from '../components/Footer';

const Signup = () => {
  const [id, onChangeId, setId] = useInput('');
  const [nickname, onChangeNickname, setNickname] = useInput('');
  const [otp, onChangeOtp, setOtp] = useInput('');
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const [password, onChangePassword, setPassword] = useInput('');
  const [checkPasswordError, setCheckPasswordError] = useState(false);
  const [checkPassword, setCheckPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [schoolEmail, setSchoolEmail] = useState('');
  const [schoolEmailError, setSchoolEmailError] = useState(false);
  const [interests, setInterests] = useState([]);
  const [interestsError, setInterestsError] = useState(false);
  const [major, setMajor] = useState([]);
  const [majorError, setMajorError] = useState(false);
  const [termsVisible, setTermsVisible] = useState(false);
  const dispatch = useDispatch();
  const {
    isSignUpLoading, isSignUpDone, isSignUpError, me, checkDuplicateEmail,
    checkOtp, checkIdError, checkIdDone, checkNicknameDone, checkNicknameError,
  } = useSelector((state) => state.user);
  const { majorsData, categoryData } = useSelector((state) => state.post);

  const termsOk = () => setTermsVisible(false);
  const termsCancel = () => setTermsVisible(false);

  useEffect(() => {
    if (me && me.id) Router.replace('/');
  }, [me && me.id]);

  useEffect(() => {
    if (isSignUpDone) {
      alert('NUTEE에 오신것을 환영합니다!');
      Router.replace('/');
    }
  }, [isSignUpDone]);

  useEffect(() => {
    if (isSignUpError) alert(isSignUpError);
  }, [isSignUpError]);

  const pageWrapper = useMemo(() => ({ display: 'flex', justifyContent: 'center' }), []);
  const paperWrapper = useMemo(() => ({ width: '35vw', minWidth: '340px', maxWidth: '450px', margin: '18vh 0 10vh 0' }), []);
  const nuteeWrapper = useMemo(() => ({ textAlign: 'center', fontSize: '25px', color: '#050', textDecoration: 'underline' }), []);
  const textWrapper = useMemo(() => ({ textAlign: 'center', fontSize: '30px', marginBottom: '-20px', fontWeight: 'bold' }), []);
  const h1Wrapper = useMemo(() => ({ textAlign: 'center' }), []);
  const prefixWrapper = useMemo(() => ({ color: 'rgba(0, 0, 0, .25)' }), []);
  const failureWrapper = useMemo(() => ({ color: 'red', fontSize: '12px', marginLeft: '5px' }), []);
  const successWrapper = useMemo(() => ({ color: 'green', fontSize: '12px', marginLeft: '5px' }), []);
  const majorButtonWrapper = useMemo(() => ({ color: 'white', background: '#13c276', width: '100%', border: '1px solid white', height: '39px' }), []);
  const checkboxWrapper = useMemo(() => ({ margin: '0px 5px 5px 0px' }), []);
  const termsWrapper = useMemo(() => ({ color: '#005000', textDecoration: 'underline' }), []);
  const selectWrapper = useMemo(() => ({ menu: (css) => ({ ...css, zIndex: 999 }) }), []);
  const buttonWrapper = useMemo(() => ({ color: 'white', background: '#13c276', width: '100%', border: '1px solid white' }), []);
  const signupButtonWrapper = useMemo(() => ({ width: '150px', margin: '0 auto' }), []);

  const onSubmit = useCallback(() => {
    if (!checkIdDone) return alert('아이디가 확인되지 않았습니다.');
    if (!checkNicknameDone) return alert('닉네임이 확인되지 않았습니다.');
    if (password !== checkPassword) return setPasswordError(true);
    if (!schoolEmail) return setSchoolEmailError(true);
    if (!checkDuplicateEmail) return alert('이메일이 인증되지 않았습니다.');
    if (!checkOtp) return alert('otp가 확인되지 않았습니다.');
    if (!term) return setTermError(true);
    if (!major || major.length === 0) {
      alert('전공이 확인되지 않았습니다.');
      return setMajorError(true);
    }
    if (!interests || interests.length === 0) {
      alert('카테고리가 확인되지 않았습니다.');
      return setInterestsError(true);
    }
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        userId: id,
        nickname,
        password,
        schoolEmail,
        otp,
        interests,
        majors: major,
      },
    });
    if (isSignUpDone) {
      setId('');
      setNickname('');
      setPassword('');
      setCheckPassword('');
      setSchoolEmail('');
      setInterests([]);
      setMajor([]);
      setOtp('');
      setTerm(false);
    }
  }, [id, checkIdDone, nickname, checkNicknameDone, password, checkPassword,
    schoolEmail, checkDuplicateEmail, otp, checkOtp, major, interests, term]);

  const onCheckschoolEmail = () => {
    if (!schoolEmail.includes('@office.skhu.ac.kr')) return alert('이메일을 잘못 입력하셨습니다.');
    dispatch({
      type: CHECK_DUPLICATE_EMAIL_REQUEST,
      data: { schoolEmail },
    });
    dispatch({
      type: SEND_OPT_REQUEST,
      data: { schoolEmail },
    });
  };

  const onCheckOtp = () => {
    dispatch({
      type: CHECK_OTP_REQUEST,
      data: { otp },
    });
  };

  const onCheckId = () => {
    if (id.length < 4) return alert('아이디는 최소 3글자 이상입니다.');
    dispatch({
      type: CHECK_ID_REQUEST,
      data: { userId: id },
    });
  };

  const onCheckNickname = () => {
    if (nickname.length > 12) return alert('닉네임은 최대 12자까지 가능합니다.');
    dispatch({
      type: CHECK_NICKNAME_REQUEST,
      data: { nickname },
    });
  };

  const onCheckPassword = useCallback(() => {
    const regex = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*_+-=]).{7,15}/;
    if (!regex.test(password)) {
      alert('특수문자(!@#$%^&*_+-=)포함 7~15글자로 수정해주세요.');
      setCheckPasswordError(true);
    }
    setCheckPasswordError(false);
    alert('비밀번호 확인 완료');
  }, [password]);

  const onChangeCheckPassword = useCallback((e) => {
    setCheckPassword(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const onChangeSchoolEmail = useCallback((e) => {
    setSchoolEmailError(!e.target.value.includes('@office.skhu.ac.kr'));
    setSchoolEmail(e.target.value);
  }, [schoolEmail]);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, [term]);

  const onChangeMajor = useCallback(() => {
    if (major.length > 2) {
      alert('전공을 다시 선택해주세요. 전공은 3개 이상 불가합니다.');
      return setMajorError(true);
    }
    if (major.length === 0) {
      alert('전공을 선택해주세요');
      return setMajorError(true);
    }
    setMajorError(false);
  }, [major]);

  const onChangeInterests = useCallback(() => {
    if (interests.length === 0) {
      alert('카테고리를 선택해주세요');
      return setInterestsError(true);
    }
    setInterestsError(false);
  }, [interests]);

  const selectOptions = (v) => {
    const objectData = v.map((data) => ({ value: data, label: data }));
    return objectData;
  };

  const onSelectMajors = (selected) => {
    const select = selected.map(({ value }) => value);
    setMajor(select);
  };

  const onSelectInterests = (selected) => {
    const select = selected.map(({ value }) => value);
    setInterests(select);
  };

  const onSpace = (e) => {
    if (e.keyCode === 32 || e.key === 'Space') {
      e.preventDefault();
    }
  };

  return (
    <>
      <div style={pageWrapper}>
        <div style={paperWrapper}>
          <p style={textWrapper}>회원가입</p>
          <h3 style={h1Wrapper}>
            <Link href="/index"><a style={nuteeWrapper}>NUTEE</a></Link>
            에 오신것을 환영합니다!
          </h3>
          <Form onFinish={onSubmit}>
            {/* 아이디 */}
            <Row gutter={8}>
              <Col span={17}>
                <Input
                  prefix={<IdcardOutlined style={prefixWrapper} />}
                  name="user-id"
                  value={id}
                  placeholder="아이디"
                  required
                  onKeyDown={onSpace}
                  onChange={onChangeId}
                />
              </Col>
              <Col span={7}>
                <Button style={buttonWrapper} onClick={onCheckId}>ID 확인</Button>
              </Col>
            </Row>
            {checkIdError && <div style={failureWrapper}>중복된 아이디입니다.</div>}
            {checkIdDone && <div style={successWrapper}>사용 가능한 아이디입니다.</div>}
            <br />
            {/* 닉네임 */}
            <Row gutter={8}>
              <Col span={15}>
                <Input
                  prefix={<UserOutlined style={prefixWrapper} />}
                  name="user-nick"
                  value={nickname}
                  placeholder="닉네임"
                  required
                  onKeyDown={onSpace}
                  onChange={onChangeNickname}
                />
                {checkNicknameError && <div style={failureWrapper}>중복된 닉네임입니다.</div>}
                {checkNicknameDone && <div style={successWrapper}>사용 가능한 닉네임입니다.</div>}
              </Col>
              <Col span={9}>
                <Button style={buttonWrapper} onClick={onCheckNickname}>닉네임 확인</Button>
              </Col>
            </Row>
            <br />
            {/* 비밀번호 */}
            <Row gutter={8}>
              <Col span={15}>
                <Input
                  prefix={<LockOutlined style={prefixWrapper} />}
                  name="user-password"
                  type="password"
                  placeholder="비밀번호"
                  value={password}
                  required
                  onChange={onChangePassword}
                />
              </Col>
              <Col span={9}>
                <Button style={buttonWrapper} onClick={onCheckPassword}>비밀번호 확인</Button>
              </Col>
            </Row>
            {checkPasswordError && <div style={failureWrapper}>특수문자(!@#$%^&*_+-=)포함 7~15글자</div>}
            <br />
            <Row>
              <Input
                prefix={<LockOutlined style={prefixWrapper} />}
                name="user-check-password"
                type="password"
                placeholder="비밀번호 확인"
                value={checkPassword}
                required
                onChange={onChangeCheckPassword}
              />
            </Row>
            {passwordError && <div style={failureWrapper}>비밀번호가 일치하지 않습니다.</div>}
            <br />
            {/* 이메일 */}
            <Row gutter={8}>
              <Col span={15}>
                <Input
                  prefix={<MailOutlined style={prefixWrapper} />}
                  name="user-schoolEmail"
                  placeholder="이메일(@office.skhu.ac.kr)"
                  value={schoolEmail}
                  required
                  onKeyDown={onSpace}
                  onChange={onChangeSchoolEmail}
                />
              </Col>
              <Col span={9}>
                <Button style={buttonWrapper} onClick={onCheckschoolEmail}>이메일 인증</Button>
              </Col>
            </Row>
            {schoolEmailError && <div style={failureWrapper}>올바른 이메일의 형태가 아닙니다.</div>}
            {checkDuplicateEmail && <div style={successWrapper}>확인 후 이메일로 OTP를 전송하였습니다.</div>}
            <br />
            {/* OTP */}
            <Row gutter={8}>
              <Col span={17}>
                <Input
                  prefix={<SafetyOutlined style={prefixWrapper} />}
                  name="user-otp"
                  value={otp}
                  placeholder="otp"
                  required
                  onKeyDown={onSpace}
                  onChange={onChangeOtp}
                />
              </Col>
              <Col span={7}>
                <Button style={buttonWrapper} onClick={onCheckOtp}>otp 확인</Button>
              </Col>
            </Row>
            {checkOtp && <div style={successWrapper}>otp가 인증되었습니다.</div>}
            <br />
            {/* 전공 */}
            <Row gutter={8}>
              <Col span={18}>
                <Select
                  isMulti
                  placeholder="학부 또는 전공을 선택해주세요."
                  name="user-major"
                  menuPlacement="top"
                  onChange={onSelectMajors}
                  options={selectOptions(majorsData)}
                  styles={selectWrapper}
                  required
                />
              </Col>
              <Col span={6}>
                <Button style={majorButtonWrapper} onClick={onChangeMajor}>확인</Button>
              </Col>
            </Row>
            {majorError && <div style={failureWrapper}>학부 또는 전공을 선택하셔야 합니다.</div>}
            <br />
            {/* 카테고리 */}
            <Row gutter={8}>
              <Col span={18}>
                <Select
                  isMulti
                  placeholder="카테고리를 선택해주세요."
                  name="user-interests"
                  menuPlacement="top"
                  onChange={onSelectInterests}
                  options={selectOptions(categoryData)}
                  styles={selectWrapper}
                  required
                />
              </Col>
              <Col span={6}>
                <Button style={majorButtonWrapper} onClick={onChangeInterests}>확인</Button>
              </Col>
            </Row>
            {interestsError && <div style={failureWrapper}>카테고리를 선택하셔야 합니다.</div>}
            <br />
            {/* 약관 */}
            <Checkbox style={checkboxWrapper} name="user-term" value={term} onChange={onChangeTerm} />
            <a style={termsWrapper} onClick={setTermsVisible}><b>NUTEE 회원 약관</b></a>
            에 동의합니다.
            {termError && <div style={failureWrapper}>약관에 동의하셔야 합니다.</div>}
            <br />
            <br />
            {/* 회원가입 버튼 */}
            <div style={signupButtonWrapper}>
              <Button style={buttonWrapper} type="round" htmlType="submit" loading={isSignUpLoading}>회원가입</Button>
            </div>
            <br />
          </Form>
        </div>
      </div>
      <Modal
        visible={termsVisible}
        onOk={termsOk}
        onCancel={termsCancel}
        footer={null}
        closable={false}
        title="NUTEE 회원 약관"
        width={470}
      >
        <Terms setTermsVisible={setTermsVisible} />
      </Modal>
      <Footer />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_CATEGORY_DATA_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_MAJOR_DATA_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Signup;
