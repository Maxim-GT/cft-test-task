import { useSessionStore } from '@/entities/session';
import { Loader } from '@/shared/ui';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface IProtectedRouteProps {
	children: JSX.Element;
}

export const ProtectedRoute = ({ children }: IProtectedRouteProps): JSX.Element => {
	const status = useSessionStore((state) => state.status);
	const isHydrated = useSessionStore((s) => s.isHydrated);
	const isAuthReady = useSessionStore((s) => s.isAuthReady);

	if (!isHydrated || !isAuthReady) {
		return <main><Loader size='lg' /></main>
	}

	if (status !== 'authenticated') {
		return <Navigate to="/auth?step=phone" replace />;
	}

	return children;
};
