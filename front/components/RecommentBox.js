import React, {useState,useEffect} from 'react';
import Recomment from "./Recomment";

const RecommentBox = ({reCom, post,setReply}) => {
    const [show, setShow] = useState(false);

    const onRecomment = ()=>{
        setShow(true);
        setReply(true);
    };
    return (show ?
            reCom.map((v) => {
                return (
                    <Recomment item={v} post={post}/>
                )
            })
            :
        (reCom.length!==0?<a style={{marginLeft:'35px'}} onClick={onRecomment}>답글보기</a>:<></>)
    )
};
export default RecommentBox;