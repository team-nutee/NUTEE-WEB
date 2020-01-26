import React from 'react';
import {LOAD_MAIN_POSTS_REQUEST} from "../reducers/post";
import Chatting from "../chat/src";
import Messenger from "../chat/src/components/Messenger";

const Chat = () => {
    return(
        <>
            <Messenger/>
        </>
    );
};

Chat.getInitialProps = async (context) => {
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
};

export default Chat;