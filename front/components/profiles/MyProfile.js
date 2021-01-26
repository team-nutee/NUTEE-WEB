import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from "../../reducers/user";
import { Button, Card, Modal } from "antd";
import { ProfileOutlined, SettingOutlined } from "@ant-design/icons";
import ProfileAvatar from "./ProfileAvatar";
import Setting from "../Setting";

const MyProfile = ({ target }) => {
  const [Visible, setVisible] = useState(false); //설정 modal

  const dispatch = useDispatch();
  const { me, userInfo } = useSelector(state => state.user);
  
  const setOk = () => {
    setVisible(false);
  };
  const setCancel = () => {
    setVisible(false);
  };

  const onFollow = useCallback(
    userId => () => {
      dispatch({
        type: FOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    []
  );

  const onUnfollow = useCallback(
    userId => () => {
      dispatch({
        type: UNFOLLOW_USER_REQUEST,
        data: userId,
      });
    },
    []
  );

  const cardWrapper = useMemo(() => ({ color: "black" }), []);
  const linkWrapper = useMemo(() => ({ margin : '0' }), []);
  const setWrapper = useMemo(() => ({ float: "right", color: "black", fontSize: "13px", marginRight : '5px'}), []);
  const prefixWrapper = useMemo(
    () => ({ color: "rgba(0, 0, 0, 0.7)", marginRight: "3px" }),
    []
  );
  const profileWrapper = useMemo(
    () => ({ float: "right", color: "black", fontSize: "13px" }),
    []
  );

  return (
    <>
      {target ? (
        <div>
          <Card
            style={cardWrapper}
            actions={[
              <Link href="/profile" key="twit">
                <a>
                  <div>
                    <b>게시글</b>
                    <br />
                    {target.postNum}
                  </div>
                </a>
              </Link>,
              <Link href="/profile" key="following">
                <a>
                  <div>
                    <b>댓글</b>
                    <br />
                    {target.commentNum}
                  </div>
                </a>
              </Link>,
              <Link href="/profile" key="follower">
                <a>
                  <div>
                    <b>추천</b>
                    <br />
                    {target.likeNum}
                  </div>
                </a>
              </Link>,
            ]}
          >
            <Card.Meta
              avatar={
                target.Image ? (
                  <ProfileAvatar
                    nickname={target.nickname[0]}
                    imagePath={target.Image.src}
                  />
                ) : (
                  <ProfileAvatar nickname={target.nickname} />
                )
              }
              title={
                !target || me.id === target.id ? (
                  <>
                    {target.nickname}
                    <br />
                    <br />
                    <div style={linkWrapper}>
                      <Link href="/profile">
                        <a>
                          <b style={profileWrapper}>
                            <ProfileOutlined style={prefixWrapper} />
                            프로필
                          </b>
                        </a>
                      </Link>
                     
                        <a style={setWrapper} onClick={setVisible}>
                        <b><SettingOutlined style={prefixWrapper} />
                          설정</b>
                        </a>
                      </div>
                  </>
                ) : target.Followers &&
                  target.Followers.find(v => v.id === me.id) ? (
                  <>
                    {target.nickname}
                    <br />
                    <Button size="small" onClick={onUnfollow(target.id)}>
                      언팔로우
                    </Button>
                  </>
                ) : (
                  <>
                    {target.nickname}
                    <br />
                    <Button size="small" onClick={onFollow(target.id)}>
                      팔로우
                    </Button>
                  </>
                )
              }
            />
          </Card>
        </div>
      ) : (
        <></>
      )}

      <Modal
        visible={Visible}
        onOk={setOk}
        onCancel={setCancel}
        footer={null}
        closable={false}
        width={700}
      >
        <Setting setVisible={setVisible} />
      </Modal>
    </>
  );
};

export default MyProfile;
