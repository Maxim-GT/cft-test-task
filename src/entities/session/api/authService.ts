import { apiClient } from '@/shared/api/api-client'
import type {
	IGetUserSessionResponse,
	IOtpRequest,
	IOtpResponse,
	ISignInRequest,
	ISignInResponse
} from '@/shared/api/auth/types'
import { ENDPOINTS } from '@/shared/api/config'

export const authService = {
	sendOtp: async (data: IOtpRequest) => {
		const response = await apiClient.post<IOtpResponse>(ENDPOINTS.AUTH.OTP, data);
		return response.data;
	},

	signIn: async (data: ISignInRequest) => {
		const response = await apiClient.post<ISignInResponse>(ENDPOINTS.AUTH.SIGNIN, data);
		return response.data;
	},

	getSession: async () => {
		const response = await apiClient.get<IGetUserSessionResponse>(ENDPOINTS.USER.SESSION);
		return response.data;
	}
}