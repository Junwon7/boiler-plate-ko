import {combineReducers} from 'redux';  // 하나로 합치는 기능
import user from './user_reducer';

// 하나로 합쳐주는 기능
const rootReducer = combineReducers({
    user
})

export default rootReducer;