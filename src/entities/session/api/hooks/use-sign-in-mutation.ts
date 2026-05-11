
import { authService, useSessionStore } from '@/entities/session';
import { useMutation } from '@tanstack/react-query';
import { ApiError, normalizeApiError, throwWhenBusinessError } from '../../../../shared/api/errors';
import { queryClient } from '@/app/providers/react-query/config/query-client';
import { authQueryKeys } from '../../../../shared/api/auth/query-keys';

export function useSignInMutation() {
	return useMutation({
		mutationFn: async (code: number) => {
			const { phone } = useSessionStore.getState();

			if (!phone) {
				throw new ApiError(
					'Сначала запросите код',
					'BUSINESS_ERROR',
				);
			}

			const data = await authService.signIn({ phone, code });
			throwWhenBusinessError(data);

			return data;
		},
		onSuccess: async (data) => {
			useSessionStore.setState({
				user: data.user,
				token: data.token,
				status: 'authenticated',
				phone: null,
				retryAt: null,
				error: null,
			});

			await queryClient.invalidateQueries({ queryKey: authQueryKeys.all });
		},
		onError: (err) => {
			useSessionStore.setState({
				error: normalizeApiError(err).message,
			});
		},
	});
};