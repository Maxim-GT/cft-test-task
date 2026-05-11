import { useQuery } from '@tanstack/react-query';
import { authQueryKeys } from '../../../../shared/api/auth/query-keys';
import { authService, useSessionStore } from '@/entities/session';
import { throwWhenBusinessError } from '../../../../shared/api/errors';

export function useSessionQuery() {
	const token = useSessionStore((s) => s.token);
	const isHydrated = useSessionStore((s) => s.isHydrated);

	return useQuery({
		queryKey: authQueryKeys.session(),
		queryFn: async () => {
			const data = await authService.getSession();
			throwWhenBusinessError(data);
			return data.user;
		},
		enabled: isHydrated && !!token
	});

}