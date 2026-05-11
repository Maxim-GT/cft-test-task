import { AuthPage } from '@/pages/auth';
import { ProfilePage } from '@/pages/profile';
import { Navigate, type RouteObject } from 'react-router-dom';
import { PublicRoute } from '../ui/public-route';
import { ProtectedRoute } from '../ui/protected-route';
import { RootRedirect } from '../ui/root-redirect';

export const routes: RouteObject[] = [
	{
		path: '/',
		element: <RootRedirect />,
	},
	{
		path: '/auth',
		element: (
			<PublicRoute>
				<AuthPage />
			</PublicRoute>
		),
	},
	{
		path: '/profile',
		element: (
			<ProtectedRoute>
				<ProfilePage />
			</ProtectedRoute>
		),
	},
	{
		path: '*',
		element: <Navigate to="/auth?step=phone" replace />,
	},
];
