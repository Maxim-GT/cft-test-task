import { queryClient } from '@/app/providers/react-query/config/query-client';
import { useSessionStore } from '../model';

export function resetAuthState() {
	useSessionStore.getState().logout();
	void queryClient.cancelQueries();
	queryClient.clear();
}