import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const CommentsContent = ({commentsData}) => (
    <div>
        {commentsData.split(/(\s)/gi).map((v) => {
            if (v.match(/(http(s)?:\/\/([a-z0-9\w]+\.*)+[a-z0-9]{2,4})/)) {
                return <Link href={v} prefetch={false} key={v}><a target="_blank" rel="noreferrer">{v}</a></Link>;
            }
            return v;
        })}
    </div>
);

CommentsContent.propTypes = {
    commentsData: PropTypes.string.isRequired,
};

export default CommentsContent;
  

