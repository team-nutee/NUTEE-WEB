import React, { useMemo } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

moment.locale('ko');

const PostTime = ({ post }) => {
  const momentWrapper = useMemo(() => ({ fontSize: '14px' }), []);

  const date = new Date();
  const postCreateAt = new Date(post.createdAt);
  const today = moment(date).format('YYYY.MM.DD');
  const postCreatedAtHours = moment(postCreateAt).add(9, 'hours');
  const postCreatedAt = moment(postCreatedAtHours).format('YYYY.MM.DD');
  const todayBetweenTime = moment(date);
  const betweenTime = moment.duration(todayBetweenTime.diff(postCreatedAtHours)).asMinutes();

  return (
    <>
      {today === postCreatedAt && (betweenTime <= 59) ? (
        <><span style={momentWrapper}>{moment(postCreatedAtHours).startOf('minute').fromNow()}</span></>
      ) : (<><span style={momentWrapper}>{moment(postCreatedAtHours).format('LLLL')}</span></>)}
      {post.updatedAt === post.createdAt ? <></> : <small> (수정됨)</small>}
    </>
  );
};

PostTime.propTypes = {
  post: PropTypes.shape({
    createdAt: PropTypes.string,
  }),
}.isRequired;

export default PostTime;
