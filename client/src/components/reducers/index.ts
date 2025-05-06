import { combineReducers } from 'redux';
import { GetMessageReducer } from './message_reducer/getMessage';
import { GetUsersreducer } from './user_reducer/getUser';
import { SyncUserreducer } from './user_reducer/syncUser';
import { SaveNotificationReducer } from './notification_reducer/saveNotification';
import { GetNotificationReducer } from './notification_reducer/getNotification';
import { clearNotification } from '../actions/notification_action/clearNotification';
import { ClearNotificationReducer } from './notification_reducer/ClearNotification';

const reducers = combineReducers({
    Message: GetMessageReducer,
    Users: GetUsersreducer,
    SyncUser: SyncUserreducer,
    SaveNotification: SaveNotificationReducer,
    GetNotification: GetNotificationReducer,
    ClearNotification: ClearNotificationReducer,
});

export default reducers;