import { Dispatch } from 'redux';
import httpHelper from '../../Helper/httpHelper';

interface FormData {
    sender_id?: number;
    receiver_id?: number;
    isRead?: boolean 
}

export function saveNotification(formData: FormData = {}) {
    return async(dispatch: Dispatch):Promise<void> => {
        if(Object.keys(formData).length > 0) {
            const request = {
                url: `/notifications`,
                method: 'POST' as const,
                header: {'Access-Control-ALlow-Origin': true},
                data: {...formData}
            };

            await httpHelper(
                request,
                (response) => {
                    dispatch({type: "SAVENOTIFICATION_SUCCESS", payload: response});
                },
                (error) => {
                    dispatch({type: 'SAVENOTIFICATION_FAILURE', payload: error});
                },
            );
        } else {
            dispatch({type: 'SAVENOTIFICATION_RESET', payload: {}});
        }
    }
}