import httpHelper from '../../Helper/httpHelper';
import { Dispatch } from 'redux';

interface FormData {
    senderId?: number;
    receiverId?: number;
}

export function getMessages(formData: FormData = {}) {
    return async(dispatch: Dispatch): Promise<void> => {
        if(Object.keys(formData).length > 0 && formData.receiverId && formData.senderId) {
            const request = {
                url: `/messages?senderId=${formData.senderId}&recieverId=${formData.receiverId}`,
                method: 'GET' as const,
                header: {'Access-Control-Allow-Origin': true},
            };

            await httpHelper(
                request,
                (response) => {
                    dispatch({type: 'GETMESSAGE_SUCCESS' , payload: response})
                },
                (error) => {
                    dispatch({type: 'GETMESSAGE_FAILURE' , payload: error})
                },
            );
        } else {
            dispatch({type: 'GETMESSAGE_RESET', payload: {}});
        }
    }
}