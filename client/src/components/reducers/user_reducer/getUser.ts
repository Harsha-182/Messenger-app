interface UserState {
    status?: 'success' | 'failure' | 'reset';
    data?: any;
}

interface Action {
    type: string;
    payload?: any;
}

export function GetUsersreducer(state: UserState = {}, action: Action): UserState{
    switch (action.type) {
        case 'GETUSERS_SUCCESS':
            return {status: 'success', data: action.payload};
        case 'GETUSERS_FAILURE':
            return {status: 'failure', data: action.payload};
        case 'GETUSERS_RESET':
            return {status: 'reset', data: action.payload};
        default:
            return {...state};
    }
}