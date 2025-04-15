interface MessageState {
    status?: 'success' | 'failure' | 'reset';
    data?: any;
}

interface Action {
    type: string;
    payload?: any;
}

export function GetMessageReducer(state: MessageState = {}, action: Action): MessageState{
    switch (action.type) {
        case 'GETMESSAGE_SUCCESS':
            return {status: 'success', data: action.payload};
        case 'GETMESSAGE_FAILURE':
            return {status: 'failure', data: action.payload};
        case 'GETMESSAGE_RESET':
            return {status: 'reset', data: action.payload};
        default:
            return {...state};
    }
}