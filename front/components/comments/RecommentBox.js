/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* 위에는 나중에 해결 예정 */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Recomment from './Recomment';

const RecommentBox = ({ reComment, post, onReply, parentId }) => {
  const [show, setShow] = useState(false);

  const onRecomment = () => {
    setShow(true);
    onReply();
  };

  const reCommentWrapper = useMemo(() => ({ marginLeft: '35px' }), []);

  return (show
    ? reComment.map((data) => <Recomment item={data} post={post} parentId={parentId} />)
    : (reComment.length !== 0 ? <a style={reCommentWrapper} onClick={onRecomment}>답글보기</a> : <></>)
  );
};

RecommentBox.propTypes = {
  reComment: PropTypes.object,
  post: PropTypes.object,
  onReply: PropTypes.func,
}.isRequired;

export default RecommentBox;
