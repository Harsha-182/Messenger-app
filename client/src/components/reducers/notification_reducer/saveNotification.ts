interface NotificationState {
    status?: 'success' | 'failure' | 'reset';
    data?: Notification[] | null;
}

interface Notification {
    id?: number;
    isRead?: boolean;
    sender_id?: number;
    receiver_id?: number;
    sender?: User;
    receiver?: User;
}

interface User {
    id: number;
    name: string;
}

interface Action {
    type: string;
    payload: Notification[] | null;

}

export function SaveNotificationReducer(state: NotificationState, action: Action): NotificationState{
    switch(action.type) {
        case 'SAVENOTIFICAITON_SUCCESS':
            return {status: 'success', data: action.payload};
        case "SAVENOTIFICATION_FAILURE":
            return {status: 'failure', data: action.payload};
        case "SAVENOTIFICATION_RESET":
            return {status: 'reset', data: action.payload};
        default:
            return {...state}
    }
}