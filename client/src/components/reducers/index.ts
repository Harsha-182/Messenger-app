import { combineReducers } from 'redux';
import {GetMessageReducer } from './message_reducer/getMessage';

// Define the shape of the state
// export interface RootState {
//     Message: ReturnType<typeof GetMessageReducer>;
// }

// Combine reducers with proper typing
const Reducers = combineReducers({
    Message: GetMessageReducer,
});

export default Reducers;