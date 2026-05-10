import { useEffect, type JSX } from 'react';
import { RouterProvider } from '@/app/providers/router';
import { useSessionStore } from '@/entities/session';
import { ToastProvider } from './providers/toast-provider';
import { Loader } from '@/shared/ui';

function App(): JSX.Element {
	const isHydrated = useSessionStore((state) => state.isHydrated);
	const isLoadingSession = useSessionStore((state) => state.isLoadingSession);
	const isAuthReady = useSessionStore((state) => state.isAuthReady);
	const initializeAuth = useSessionStore((state) => state.initializeAuth);

	useEffect(() => {
		if (!isHydrated) {
			return;
		}
		void initializeAuth();
	}, [isHydrated, initializeAuth]);

	if (isLoadingSession || !isAuthReady || !isHydrated) {
		return <main><Loader size='lg' /></main>;
	}

	return (
		<>
			<RouterProvider />
			<ToastProvider />
		</>
	);
}

export default App;
