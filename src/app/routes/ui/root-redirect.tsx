import { useSessionStore } from '@/entities/session';
import { Loader } from '@/shared/ui';
import { Navigate } from 'react-router-dom';

export function RootRedirect() {
	const status = useSessionStore((s) => s.status);
	const isHydrated = useSessionStore((s) => s.isHydrated);
	const isAuthReady = useSessionStore((s) => s.isAuthReady);

	if (!isHydrated || !isAuthReady) {
		return (
			<main><Loader size='lg' /></main>
		)
	};

	if (status === 'authenticated') {
		return <Navigate to="/profile" replace />;
	};

	return <Navigate to="/auth?step=phone" replace />;
}