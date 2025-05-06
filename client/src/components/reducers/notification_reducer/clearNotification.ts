interface NotificationState {
    status?: 'success' | 'failure' | 'reset';
    data?: Notification[] | null;
}

interface Notification {
    id?: number;
    otherUser?: number;
    currentUser?: number;
    sender?: User;
}

interface User {
    id: number;
    name: string;
}

interface Action {
    type: string;
    payload: Notification[] | null;

}

export function ClearNotificationReducer(state: NotificationState = {status: 'reset', data: null}, action: Action): NotificationState{
    switch(action.type) {
        case 'CLEARNOTIFICATION_SUCCESS':
            return {status: 'success', data: action.payload};
        case "CLEARNOTIFICATION_FAILURE":
            return {status: 'failure', data: action.payload};
        case "CLEARNOTIFICATION_RESET":
            return {status: 'reset', data: action.payload};
        default:
            return state
    }
}