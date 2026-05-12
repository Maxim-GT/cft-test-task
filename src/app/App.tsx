import { RouterProvider } from '@/app/providers/router';
import { useSessionStore } from '@/entities/session';
import { AppErrorBoundary, Loader } from '@/shared/ui';
import { ToastProvider } from './providers/toast';
import { ReactQueryProvider } from './providers/react-query';
import { AppInitializer } from './providers/app-initializer';
import type { JSX } from 'react';

export function App(): JSX.Element {
    const isHydrated = useSessionStore((state) => state.isHydrated);
    const isLoadingSession = useSessionStore((state) => state.isLoadingSession);
    const isAuthReady = useSessionStore((state) => state.isAuthReady);

    if (!isHydrated) {
        return (
            <main>
                <Loader size="lg" />
            </main>
        );
    }

    return (
        <AppErrorBoundary>
            <ReactQueryProvider>
                <AppInitializer />
                {!isAuthReady || isLoadingSession ? (
                    <main>
                        <Loader size="lg" />
                    </main>
                ) : (
                    <>
                        <RouterProvider />
                        <ToastProvider />
                    </>
                )}
            </ReactQueryProvider>
        </AppErrorBoundary>
    );
}

export default App;
