import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'antd';
import PropTypes from 'prop-types';
import ProfileAvatar from './ProfileAvatar';

const { Meta } = Card;

const MyProfile = ({ target }) => {
  const { me } = useSelector((state) => state.user);
  const cardWrapper = useMemo(() => ({ color: 'black' }), []);

  return (
    <>
      {!target || me.id === target.id ? (
        <div>
          <Card
            style={cardWrapper}
            actions={[
              <div>
                <b>게시글</b>
                <br />
                {target.postNum ? target.postNum : 0}
              </div>,
              <div>
                <b>댓글</b>
                <br />
                {target.commentNum ? target.commentNum : 0}
              </div>,
              <div>
                <b>좋아요</b>
                <br />
                {target.likeNum ? target.likeNum : 0}
              </div>,
            ]}
          >
            <Meta
              avatar={
                target.Image ? <ProfileAvatar imagePath={target.profileUrl} />
                  : <ProfileAvatar />
              }
              title={target.nickname}
            />
          </Card>
        </div>
      ) : <></>}
    </>
  );
};

MyProfile.propTypes = {
  target: PropTypes.shape({
    id: PropTypes.number,
    nickname: PropTypes.string,
    image: PropTypes.string,
  }),
  me: PropTypes.shape({
    id: PropTypes.number,
  }),
}.isRequired;

export default MyProfile;
