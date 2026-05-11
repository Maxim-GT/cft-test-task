import { useSessionStore } from '@/entities/session';
import type { JSX } from 'react';
import { Navigate } from 'react-router-dom';

interface IPublicRouteProps {
    children: JSX.Element;
}

export const PublicRoute = ({ children }: IPublicRouteProps): JSX.Element => {
    const status = useSessionStore((state) => state.status);

    if (status === 'authenticated') {
        return <Navigate to="/profile" replace />;
    }

    return children;
};
