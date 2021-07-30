/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Divider } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import EditForm from './EditForm';

const PostCardContent = ({ post, editMode, onCancelEdit }) => {
  const { title, content, commentNum, likers } = post;
  const [showMore, setShowMore] = useState(false);
  const cssChange = () => { setShowMore(true); };
  const pageWrapper = useMemo(() => ({ margin: '0 30px 15px 0' }), []);
  const postDataPreWrapper = useMemo(() => ({ wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'NanumBarunGothic', fontSize: '15px' }), []);
  const h5Wrapper = useMemo(() => ({ position: 'absolute', right: '25px', bottom: '60px', fontSize: '12px' }), []);
  const preWrapper = useMemo(() => ({ wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }), []);

  const Like = useCallback((likers ? likers.length : 0), []);

  return (
    <div style={pageWrapper}>
      {(content.split('\n').length <= 7)
        ? (
          <div style={postDataPreWrapper}>
            {editMode
              ? (
                <>
                  <br />
                  <EditForm
                    postDataTotal={post}
                    onCancelEdit={onCancelEdit}
                  />
                </>
              )
              : (
                <>
                  <Divider orientation="left">{title}</Divider>
                  {content.split(/(#[^\s]+)/g).map((v) => {
                    if (v.match(/(#[^\s]+)/)) {
                      return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={v}><a>{v}</a></Link>;
                    }
                    return v.split(/(\s)/gi).map((u) => {
                      if (u.match(/(http(s)?:\/\/([a-z0-9\w]+\.*)+[a-z0-9]{2,4})/)) {
                        return <Link href={u} prefetch={false} key={u}><a target="_blank" rel="noreferrer">{u}</a></Link>;
                      }
                      return u;
                    });
                  })}
                </>
              )}

            <br />
            <h5 style={h5Wrapper}>
              {`댓글 ${commentNum === undefined ? 0 : commentNum}개 좋아요${Like}개`}
            </h5>
          </div>
        )
        : (
          <div>
            {!showMore
              ? (
                <>
                  {content.split(/(#[^\s]+)/g).map((v) => {
                    if (v.match(/(#[^\s]+)/)) {
                      return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={v}><a>{v}</a></Link>;
                    }
                    return v.split(/(\s)/gi).map((u) => {
                      if (u.match(/(http(s)?:\/\/([a-z0-9\w]+\.*)+[a-z0-9]{2,4})/)) {
                        return <Link href={u} prefetch={false} key={u}><a target="_blank" rel="noreferrer">{u}</a></Link>;
                      }
                      return u;
                    });
                  })}
                  <h5 style={h5Wrapper}>
                    {`댓글 ${commentNum === undefined ? 0 : commentNum}개 좋아요${Like}개`}
                  </h5>
                </>
              )
              : (
                <pre style={preWrapper}>
                  {content.split(/(#[^\s]+)/g).map((v) => {
                    if (v.match(/(#[^\s]+)/)) {
                      return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={v}><a>{v}</a></Link>;
                    }

                    return v.split(/(\s)/gi).map((u) => {
                      if (u.match(/(http(s)?:\/\/([a-z0-9\w]+\.*)+[a-z0-9]{2,4})/)) {
                        return <Link href={u} prefetch={false} key={u}><a target="_blank" rel="noreferrer">{u}</a></Link>;
                      }
                      return u;
                    });
                  })}
                  <h5 style={h5Wrapper}>
                    {`댓글 ${commentNum === undefined ? 0 : commentNum}개 좋아요${Like}개`}
                  </h5>
                </pre>
              )}
            {!showMore
              ? <a onClick={cssChange}>더보기</a>
              : <></>}
          </div>
        )}
    </div>
  );
};

PostCardContent.propTypes = {
  post: PropTypes.object,
  editMode: PropTypes.bool,
  onCancelEdit: PropTypes.bool,
}.isRequired;

export default PostCardContent;
