import { AuthPage } from "@/pages/auth";
import { ProfilePage } from "@/pages/profile";
import { Navigate, type RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to={'/auth'} replace/>
    },
    {
        path: '/auth',
        element: <AuthPage/>
    },
    {
        path: '/profile',
        element: <ProfilePage/>
    },
    {
        path: '*',
        element: <Navigate to={'/auth'} replace/>,
    },
];