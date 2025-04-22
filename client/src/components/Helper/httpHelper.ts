import axios from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface HttpObject {
    method: HttpMethod;
    url: string;
    data?: any;
    params?: any;
    headers?: {
        Authorization: string;
        'Content-Type': string;
        'Access-Control-Allow-Origin': string;
    };
}

type SuccessHandler = (data: any) => void;
type ErrorHandler = (error: any) => void;

const httpHelper = (
    httpObj: HttpObject,
    successHandler: SuccessHandler,
    errorHandler: ErrorHandler,
    isJSON: boolean = true
): void => {
    const headers = isJSON ? { 'Content-Type': 'application/json' } : {};
    const paramsInfo = httpObj.params;

    axios({
        method: httpObj.method,
        url: httpObj.url,
        baseURL: 'http://localhost:4000',
        headers: {
            ...{
                'Content-Type': 'application/json',
            },
            ...httpObj.headers,
        },
        params: paramsInfo,
        timeout: 40000,
        data: httpObj.data,
    })
        .then((response) => {
            successHandler(response.data);
        })
        .catch((error) => {
            if (error.response) {
                errorHandler(error.response.data);
            } else {
                errorHandler(error.message);
            }
        });
};

export default httpHelper;