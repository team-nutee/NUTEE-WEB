import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const CommentsContent = ({ commentsData }) => (
  <div>
    {commentsData.split(/(#[^\s]+)/g).map((v) => {
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
  </div>
);

CommentsContent.propTypes = {
  commentsData: PropTypes.string.isRequired,
};

export default CommentsContent;
