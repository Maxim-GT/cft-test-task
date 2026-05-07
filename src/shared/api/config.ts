export const API_URL = import.meta.env.VITE_API_URL;
export const API_PREFIX = '/api';
export const BASE_URL = `${API_URL}${API_PREFIX}`;

export const ENDPOINTS = {
	AUTH: {
		OTP: '/auth/otp',
		SIGNIN: '/users/signin',
	},
	USER: {
		SESSION: '/users/session',
	}
} as const;