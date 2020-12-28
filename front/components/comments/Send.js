import React from 'react';
import { Icon } from 'semantic-ui-react'

const Send = ({onSubmitComment,isAddingComment}) => {
    return(
        <Icon onClick={onSubmitComment} loading={isAddingComment} name='send'/>
    )
};
export default Send;