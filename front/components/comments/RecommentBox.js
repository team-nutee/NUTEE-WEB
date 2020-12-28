import React, { useState, useMemo } from 'react';
import Recomment from "./Recomment";

const RecommentBox = ({ reCom, post, onReply }) => {
    const [show, setShow] = useState(false);

    const onRecomment = () => {
        setShow(true);
        onReply();
    };

    const aWrapper = useMemo(() => ({ marginLeft: '35px' }), []);

    return (show ?
        reCom.map((v) => {
            return (
                <Recomment item={v} post={post} />
            )
        })
        :
        (reCom.length !== 0 ? <a style={aWrapper} onClick={onRecomment}>답글보기</a> : <></>)
    )
};
export default RecommentBox;