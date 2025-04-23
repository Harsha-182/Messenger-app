interface MessageState {
    status?: 'success' | 'failure' | 'reset';
    data?: Message[] | null;
}

interface User {
    id: number;
    name: string;
}

interface Message {
    id?: number;
    content: string;
    senderId: number;
    receiverId: number;
    sender?: User;
    receiver?: User;
}

interface Action {
    type: string;
    payload?: Message[] | null;
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