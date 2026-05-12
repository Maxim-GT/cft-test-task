import { useSessionStore } from '@/entities/session';
import { useSessionQuery } from '@/entities/session/api/hooks/use-session-query';
import { useEffect, type JSX } from 'react';

export function AppInitializer(): JSX.Element | null {
    const { data, isSuccess, isError } = useSessionQuery();
    const token = useSessionStore((state) => state.token);

    useEffect(() => {
        if (!token) {
            useSessionStore.setState({
                isAuthReady: true,
                isLoadingSession: false,
                status: 'anonymous',
            });
            return;
        }

        if (isSuccess && data) {
            useSessionStore.setState({
                user: data,
                status: 'authenticated',
                isAuthReady: true,
                isLoadingSession: false,
            });
        }

        if (isError) {
            useSessionStore.setState({
                user: null,
                token: null,
                status: 'anonymous',
                isAuthReady: true,
                isLoadingSession: false,
            });
        }
    }, [data, isSuccess, isError, token]);

    return null;
}
