import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  FOLLOW_USER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from "../../reducers/user";
import { Button, Card } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import ProfileAvatar from "./ProfileAvatar";

const { Meta } = Card;

const UserProfile = ({ target }) => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.user);

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

  const cardWrapper = useMemo(() => ({ color: "black", }), []);
  const setWrapper = useMemo(() => ({ float: "right", color: "black", fontSize: "13px", marginLeft: "5px", }), []);
  const prefixWrapper = useMemo(() => ({ color: "rgba(0, 0, 0, 0.7)", marginRight: "3px" }), []);
  const button1Wrapper = useMemo(() => ({ float: "right", marginLeft: "5px", fontSize: "13px", width: '55px' }), []);
  const button2Wrapper = useMemo(() => ({ float: "right", marginLeft: "5px", fontSize: "13px", width: '65px' }), []);

  return (
    <>
      {target ?
        <Card
          style={cardWrapper}
        >
          <Meta
            avatar={
              //프로필 이미지
              target.Image ? (
                <ProfileAvatar
                  nickname={target.nickname}
                  imagePath={target.Image.src}
                />) : (<ProfileAvatar nickname={target.nickname} />)
            }
            title={"nickname_" + target.nickname}
            description={
              //프로필 설정 or 팔로우 언팔로우
              !target || me.id === target.id ?
                <div>
                  <Link href="/setting">
                    <a style={setWrapper}><b><SettingOutlined style={prefixWrapper} />설정</b></a>
                  </Link>
                </div>
                :
                target.Followers && target.Followers.find(v => v.id === me.id) ?
                  <Button size="small" style={button2Wrapper} onClick={onUnfollow(target.id)}>
                    언팔로우
                  </Button>
                  :
                  <Button size="small" style={button1Wrapper} onClick={onFollow(target.id)}>
                    팔로우
                  </Button>
            }
          />
        </Card>
        :
        <></>
      }
    </>
  );
};

export default UserProfile;
