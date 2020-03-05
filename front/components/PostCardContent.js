import React,{useState} from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from "styled-components";

const ShowBox = styled.pre`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-wrap:break-word; 
    line-height: 1.2em;
    height: 12em; /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */
    whiteSpace: 'pre-wrap',
`;

const PostCardContent = ({ postData,commentN,likers,retweet }) => {
    const stringLength= (function(s,b,i,c){
        for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
        return b
    })(postData);

    const [showMore,setShowMore] = useState(false);

    const cssChange = () => {
        setShowMore(true);
    };

    return (
        <div>
            {(postData.split('\n').length<= 7&&stringLength<1000)
                ?
                <pre style={{
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                    wordBreak:'break-all',
                }}>
                    {postData.split(/(#[^\s]+)/g).map((v) => {
                        if (v.match(/#[^\s]+/)) {
                            return (
                                <Link
                                    href={{pathname: '/hashtag', query: {tag: v.slice(1)}}}
                                    as={`/hashtag/${v.slice(1)}`}
                                 key={v}
                                >
                                 <a>{v}</a>
                             </Link>
                            );
                        }
                        return v;
                    })}
                    {retweet && retweet===1
                        ?<h5 style={{position:'absolute',right:'15px',bottom:'10px',fontSize:'12px'}}>댓글 {commentN}개  좋아요 {likers}개</h5>
                        :<h5 style={{position:'absolute',right:'25px',bottom:'60px',fontSize:'12px'}}>댓글 {commentN}개  좋아요 {likers}개</h5>
                    }
                </pre>
                :
                <div>
                    {!showMore
                        ?
                        <ShowBox>
                            {postData.split(/(#[^\s]+)/g).map((v) => {
                                if (v.match(/#[^\s]+/)) {
                                    return (
                                        <Link
                                            href={{pathname: '/hashtag', query: {tag: v.slice(1)}}}
                                            as={`/hashtag/${v.slice(1)}`}
                                            key={v}
                                        >
                                            <a>{v}</a>
                                        </Link>
                                    );
                                }
                                return v;
                            })}
                            <h5 style={{position:'absolute',right:'25px',bottom:'60px',fontSize:'12px'}}>댓글 {commentN}개  좋아요 {likers}개</h5>
                        </ShowBox>
                        :
                        <pre style={{
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                            wordBreak:'break-all'
                        }}>
                    {postData.split(/(#[^\s]+)/g).map((v) => {
                        if (v.match(/#[^\s]+/)) {
                            return (
                                <Link
                                    href={{pathname: '/hashtag', query: {tag: v.slice(1)}}}
                                    as={`/hashtag/${v.slice(1)}`}
                                    key={v}
                                >
                                    <a>{v}</a>
                                </Link>
                            );
                        }
                        return v;
                    })}
                            <h5 style={{position:'absolute',right:'25px',bottom:'60px',fontSize:'12px'}}>댓글 {commentN}개  좋아요 {likers}개</h5>
                </pre>
                    }
                    {!showMore?
                        <a onClick={cssChange}>더보기</a>
                        :
                        <></>
                    }
                </div>
            }
        </div>
    );
};

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
};

export default PostCardContent;