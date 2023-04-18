import Reducer1 from "./plain_reducers";
import AuthReducer from "./auth_reducers";
import FormReducer  from "./form_reducers";
import PostsReducer from "./post_reducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    reducer1: Reducer1,
    auth_reducer: AuthReducer,
    form_reducer: FormReducer,
    posts_reducer: PostsReducer
})

export default rootReducer;