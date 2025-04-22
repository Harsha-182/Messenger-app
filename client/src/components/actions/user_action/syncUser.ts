import { Dispatch } from 'redux';

import httpHelper from '../../Helper/httpHelper';

interface FormData {
    name?: string;
    email?: string;
    sub?: string;
    picture?: string;
    nickname?: string;
    id?: number;
}

export function syncUsers(formData: FormData = {}, token: string) {
    return async(dispatch: Dispatch): Promise<void> => {
        // if(Object.keys(formData).length > 0) { 
            const request = {
                url: `/syncuser`,
                method: 'POST' as const,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                  },
          
                data: {...formData},
            };

            await httpHelper(
                request,
                (response) => {
                    dispatch({type: 'SYNCUSER_SUCCESS' , payload: response})
                },
                (error) => {
                    dispatch({type: 'SYNCUSER_FAILURE' , payload: error})
                },
            );
        //  } else {
        //      dispatch({type: 'SYNCUSER_RESET', payload: {}});
        //  }
    }
}