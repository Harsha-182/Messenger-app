import httpHelper from '../../Helper/httpHelper';

export function getMessages(formData = {}) {
    return async(dispatch: (arg0: { type: string; payload: any; }) => void) => {
        if(Object.keys(formData).length > 0) {
            const request = {
                url: '/messages',
                method: 'GET' as const,
                header: {'Access-Control-Allow-Origin': true},
                data: formData,
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