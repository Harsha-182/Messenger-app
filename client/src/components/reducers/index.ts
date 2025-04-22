import { combineReducers } from 'redux';
import { GetMessageReducer } from './message_reducer/getMessage';
import { GetUsersreducer } from './user_reducer/getUser';
import { SyncUserreducer } from './user_reducer/syncUser';

const reducers = combineReducers({
    Message: GetMessageReducer,
    Users: GetUsersreducer,
    SyncUser: SyncUserreducer,
});

export default reducers;