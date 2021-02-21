/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Divider } from 'antd';

const PostCardContent = ({ postTitle, postData, commentN, likers, retweet }) => {
  const [showMore, setShowMore] = useState(false);
  const cssChange = () => { setShowMore(true); };

  const pageWrapper = useMemo(() => ({ margin: '0 30px 15px 0' }), []);
  const postDataPreWrapper = useMemo(() => ({ wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'NanumBarunGothic', fontSize: '15px' }), []);
  const retweetWrapper = useMemo(() => ({ position: 'absolute', right: '-5px', bottom: '-25px', fontSize: '12px' }), []);
  const h5Wrapper = useMemo(() => ({ position: 'absolute', right: '25px', bottom: '60px', fontSize: '12px' }), []);
  const preWrapper = useMemo(() => ({ wordWrap: 'break-word', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }), []);

  const hashTagRegExp = (
    <>
      {postData.split(/(#[^\s]+)/g).map((v) => {
        if (v.match(/#[^\s]+/)) {
          return <Link href={`/hashtag/${v.slice(1)}`} prefetch={false} key={v}><a>{v}</a></Link>;
        }
        return v;
      })}
    </>
  );

  const urlReg = /(?:(http(s)?:\/\/|[\s\t\r\n\[\]\`\<\>\"\'])((?:[\w$\-_\.+!*\'\(\),]|%[0-9a-f][0-9a-f])*\:(?:[\w$\-_\.+!*\'\(\),;\?&=]|%[0-9a-f][0-9a-f])+\@)?(?:((?:(?:[a-z0-9\-가-힣]+\.)+[a-z0-9\-]{2,})|(?:[\d]{1,3}\.){3}[\d]{1,3})|localhost)(?:\:([0-9]+))?((?:\/(?:[\w$\-_\.+!*\'\(\),;:@&=ㄱ-ㅎㅏ-ㅣ가-힣]|%[0-9a-f][0-9a-f])+)*)(?:\/([^\s\/\?\.:<>|#]*(?:\.[^\s\/\?:<>|#]+)*))?(\/?[\?;](?:[a-z0-9\-]+(?:=[^\s:&<>]*)?\&)*[a-z0-9\-]+(?:=[^\s:&<>]*)?)?(#[\w\-]+)?)/;
  const urlRegExp = (
    <>
      {postData.split(`${urlReg}gi`).map((u) => {
        if (u.match(urlReg)) {
          return <Link href={u.slice(0)} prefetch={false} key={u}><a target="_blank" rel="noreferrer">{u}</a></Link>;
        }
        return u;
      })}
    </>
  );

  return (
    <div style={pageWrapper}>
      <Divider orientation="left">{postTitle}</Divider>
      {(postData.split('\n').length <= 7)
        ? (
          <div style={postDataPreWrapper}>
            {hashTagRegExp}
            {urlRegExp}
            <br />
            {retweet && retweet === 1
              ? (
                <h5 style={retweetWrapper}>
                  {`댓글 ${commentN}개 좋아요${likers}개`}
                </h5>
              )
              : (
                <h5 style={h5Wrapper}>
                  {`댓글 ${commentN}개 좋아요${likers}개`}
                </h5>
              )}
          </div>
        )
        : (
          <div>
            {!showMore
              ? (
                <>
                  {hashTagRegExp}
                  {urlRegExp}
                  <h5 style={h5Wrapper}>
                    {`댓글 ${commentN}개 좋아요${likers}개`}
                  </h5>
                </>
              )
              : (
                <pre style={preWrapper}>
                  {hashTagRegExp}
                  {urlRegExp}
                  <h5 style={h5Wrapper}>
                    {`댓글 ${commentN}개 좋아요${likers}개`}
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
  postTitle: PropTypes.string,
  postData: PropTypes.string,
  commentN: PropTypes.number,
  likers: PropTypes.number,
  retweet: PropTypes.array,
}.isRequired;

export default PostCardContent;
