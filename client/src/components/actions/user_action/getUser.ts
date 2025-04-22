import { Dispatch } from 'redux';

import httpHelper from '../../Helper/httpHelper';

interface FormData {
    senderId?: number;
    receiverId?: number;
}

export function getUsers(formData: FormData = {}, token: string) {
    return async(dispatch: Dispatch): Promise<void> => {
        // if(Object.keys(formData).length > 0) { 
            const request = {
                url: `/users`,
                method: 'GET' as const,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                  },
          
                // data: {senderId: 2, receiverId: formData.receiverId},
            };

            await httpHelper(
                request,
                (response) => {
                    dispatch({type: 'GETUSERS_SUCCESS' , payload: response})
                },
                (error) => {
                    dispatch({type: 'GETUSERS_FAILURE' , payload: error})
                },
            );
        //  } else {
        //      dispatch({type: 'GETMESSAGE_RESET', payload: {}});
        //  }
    }
}