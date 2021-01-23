import React, { useMemo } from 'react';
//import { Icon } from 'semantic-ui-react'
import { SendOutlined } from "@ant-design/icons";

const Send = ({ onSubmitComment, addCommentLoading}) => {
    const iconWrapper = useMemo(() => ({ color: '#005000' }), []);
    
    return(
        <SendOutlined style={iconWrapper} onClick={onSubmitComment} loading={addCommentLoading} />
    )
};

export default Send;