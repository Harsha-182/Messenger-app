import { Dispatch } from 'redux';
import httpHelper from '../../Helper/httpHelper';

interface FormData {
    otherUser?: number;
    currentUser?: number;
}

export function clearNotification(formData: FormData = {}) {
    return async(dispatch: Dispatch):Promise<void> => {
        if(Object.keys(formData).length > 0) {
            const request = {
                url: `/notifications/mark-as-read`,
                method: 'POST' as const,
                header: {'Access-Control-ALlow-Origin': true},
                data: {...formData}
            };

            await httpHelper(
                request,
                (response) => {
                    dispatch({type: "CLEARNOTIFICATION_SUCCESS", payload: response});
                },
                (error) => {
                    dispatch({type: 'CLEARNOTIFICATION_FAILURE', payload: error});
                },
            );
        } else {
            dispatch({type: 'CLEARNOTIFICATION_RESET', payload: {}});
        }
    }
}