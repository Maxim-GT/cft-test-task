import axios, { AxiosHeaders } from 'axios';
import { BASE_URL } from './config';
import { useSessionStore } from '@/entities/session/model/store';
import { normalizeApiError, throwWhenBusinessError } from './errors';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(function (config) {
    const token = useSessionStore.getState().token;
    const headers = AxiosHeaders.from(config.headers);

    if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    config.headers = headers;

    return config;
});

apiClient.interceptors.response.use(
    function (response) {
        throwWhenBusinessError(response.data);
        return response;
    },
    function (error) {
        const apiError = normalizeApiError(error);
        const { token, logout } = useSessionStore.getState();

        if (apiError.status === 401 && token) {
            logout();
        }

        return Promise.reject(apiError);
    },
);
