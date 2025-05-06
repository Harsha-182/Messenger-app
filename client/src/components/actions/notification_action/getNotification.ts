import { Dispatch } from 'redux';
import httpHelper from '../../Helper/httpHelper';

interface FormData {
    receiverId?: number;
}

export function getNotification(formData: FormData = {}) {
    return async(dispatch: Dispatch):Promise<void> => {
        if(Object.keys(formData).length > 0) {
            const request = {
                url: `/notification?id=${formData.receiverId}`,
                method: 'GET' as const,
                header: {'Access-Control-ALlow-Origin': true},
            };

            await httpHelper(
                request,
                (response) => {
                    dispatch({type: "GETNOTIFICATION_SUCCESS", payload: response});
                },
                (error) => {
                    dispatch({type: 'GETNOTIFICATION_FAILURE', payload: error});
                },
            );
        } else {
            dispatch({type: 'GETNOTIFICATION_RESET', payload: {}});
        }
    }
}