/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* 위에는 나중에 해결 예정 */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Recomment from './Recomment';

const RecommentBox = ({ reComment, post, onReply, cancelReply, parentId, userId }) => {
  const [show, setShow] = useState(false);

  const onRecomment = () => {
    setShow((prev) => !prev);
    if (!show){
      onReply();
    }
  };

  const cancelRecomment = () => {
    setShow((prev) => !prev);
    cancelReply();
  };

  const reCommentWrapper = useMemo(() => ({ marginLeft: '35px', fontWeight: 'bold' }), []);

  return (show
    ? <> 
      <a style={reCommentWrapper} onClick={cancelRecomment}>답글 숨기기</a>
      {reComment.map((data) => <Recomment item={data} post={post} parentId={parentId} userId={userId} />)} 
      </>
    : (reComment.length !== 0 ? <a style={reCommentWrapper} onClick={onRecomment}>답글 보기</a> : <></>)
  );
};

RecommentBox.propTypes = {
  reComment: PropTypes.object,
  post: PropTypes.object,
  userId: PropTypes.number,
  onReply: PropTypes.func,
}.isRequired;

export default RecommentBox;
