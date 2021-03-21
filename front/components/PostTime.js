import React, { useMemo } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

moment.locale('ko');

const PostTime = ({ post }) => {
  const momentWrapper = useMemo(() => ({ fontSize: '14px' }), []);
  const date = new Date();
  const postCreateAt = new Date(post.createdAt);
  const today = moment(date).format('YYYY.MM.DD');
  const postCreatedAtH = moment(postCreateAt).add(9, 'hours');
  const postCreatedAtHours = moment(postCreatedAtH).add(20, 'seconds');
  const postCreatedAt = moment(postCreatedAtHours).format('YYYY.MM.DD');
  const todayBetweenTime = moment(date);
  const betweenTime = moment.duration(todayBetweenTime.diff(postCreatedAtHours)).asMinutes();
  const edit = moment(post.updatedAt).format('lll') !== moment(post.createdAt).format('lll') ? <small> (수정)</small> : <></>;

  return (
    <>
      {today === postCreatedAt && (betweenTime <= 59) ? (
        <><span style={momentWrapper}>{moment(postCreatedAtHours).startOf('minute').fromNow()}</span></>
      ) : (<><span style={momentWrapper}>{moment(postCreatedAtHours).format('LLLL')}</span></>)}
      {post.createdAt ? edit : <></>}
    </>
  );
};

PostTime.propTypes = {
  post: PropTypes.shape({
    createdAt: PropTypes.string,
  }),
}.isRequired;

export default PostTime;
