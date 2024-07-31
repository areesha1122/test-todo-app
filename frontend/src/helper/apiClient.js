import axios from 'axios';
import { getLocalStorageItem } from '../utils/localStorage';

const apiClient = () => {
    const defaultOptions = {
        baseURL: 'http://51.20.61.151:8000',
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    instance.interceptors.request.use(
        (request) => requestHandler(request),
        (error) => errorHandler(error)
    );

    instance.interceptors.response.use(
        (response) => responseHandler(response),
        (error) => errorHandler(error)
    );
    return instance;
};

// Step-2: Create request, response & error handlers
const requestHandler = (request) => {
    let storedToken = getLocalStorageItem('auth-token');
    request.headers.Authorization = storedToken ? `Bearer ${storedToken}` : '';
    return request;
};

const responseHandler = (response) => {
    return response;
};

const errorHandler = (error) => {
    console.log(error);
    return Promise.reject(error);
};

export default apiClient();
