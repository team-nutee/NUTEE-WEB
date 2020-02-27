import {combineReducers} from 'redux';
import user from './user';
import post from './post';
import notice from './notice'

const rootReducer = combineReducers({
    user,
    post,
    notice,
});

export default rootReducer;

