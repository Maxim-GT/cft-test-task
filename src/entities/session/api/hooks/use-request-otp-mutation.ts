
import { authService, useSessionStore } from '@/entities/session';
import { useMutation } from '@tanstack/react-query';
import { ApiError, normalizeApiError, throwWhenBusinessError } from '../../../../shared/api/errors';

export function useRequestOtpMutation() {
	return useMutation({
		mutationFn: async (phone: string) => {
			const state = useSessionStore.getState();
			const msUntilRetry = state.getMsUntilRetry();

			if (msUntilRetry > 0 && phone === state.phone) {
				throw new ApiError(
					`Повторная отправка доступна через ${Math.ceil(msUntilRetry / 1000)} сек.`,
					'BUSINESS_ERROR',
				);
			}

			const data = await authService.sendOtp({ phone });
			throwWhenBusinessError(data);

			return {
				phone,
				retryDelay: data.retryDelay,
			};
		},
		onSuccess: ({ phone, retryDelay }) => {
			useSessionStore.setState({
				phone,
				status: 'otp_sent',
				retryAt: Date.now() + retryDelay,
				error: null,
			});
		},
		onError: (err) => {
			useSessionStore.setState({
				error: normalizeApiError(err).message,
			});
		},
	});
};