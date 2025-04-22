interface UserState {
    status?: 'success' | 'failure' | 'reset';
    data?: any;
}

interface Action {
    type: string;
    payload?: any;
}

export function SyncUserreducer(state: UserState = {}, action: Action): UserState{
    switch (action.type) {
        case 'SYNCUSER_SUCCESS':
            return {status: 'success', data: action.payload};
        case 'SYNCUSER_FAILURE':
            return {status: 'failure', data: action.payload};
        case 'SYNCUSER_RESET':
            return {status: 'reset', data: action.payload};
        default:
            return {...state};
    }
}