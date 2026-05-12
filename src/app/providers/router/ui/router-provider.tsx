import type { JSX } from 'react';
import { routes } from '@/app/providers/router/routes';
import { createBrowserRouter, RouterProvider as ReactRouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

export const RouterProvider = (): JSX.Element => {
    return <ReactRouterProvider router={router} />;
};
