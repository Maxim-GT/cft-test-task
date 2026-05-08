import { useSessionStore } from "@/entities/session";
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface IProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute = ({children}: IProtectedRouteProps ): JSX.Element => {
    const status = useSessionStore((state) => state.status);

    if (status !== 'authenticated') {
        return <Navigate to='/auth?step=phone'/>
    }
    
    return children;
}