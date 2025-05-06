interface NotificationState {
    status?: 'success' | 'failure' | 'reset';
    data?: Notification[] | null;
}

interface Notification {
    id?: number;
    senderId?: number;
    unreadCount?: number;
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

export function GetNotificationReducer(state: NotificationState = {status: 'reset', data: null}, action: Action): NotificationState{
    switch(action.type) {
        case 'GETNOTIFICATION_SUCCESS':
            return {status: 'success', data: action.payload};
        case "GETNOTIFICATION_FAILURE":
            return {status: 'failure', data: action.payload};
        case "GETNOTIFICATION_RESET":
            return {status: 'reset', data: action.payload};
        default:
            return state
    }
}