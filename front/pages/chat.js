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

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    console.log(context);
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  });

export default Chat;