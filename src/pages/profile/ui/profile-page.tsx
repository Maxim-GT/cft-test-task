import { useSessionStore } from '@/entities/session';
import { Button } from '@/shared/ui';
import { useQueryClient } from '@tanstack/react-query';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
export const ProfilePage = (): JSX.Element => {
    const navigate = useNavigate();
    const logout = useSessionStore((state) => state.logout);
    const queryClient = useQueryClient();

    const handleLogout = () => {
        logout();
        queryClient.removeQueries({ queryKey: ['auth'] });
        queryClient.removeQueries({ queryKey: ['profile'] });
        void navigate('/auth?step=phone', { replace: true });
    };

    return (
        <main>
            <h1>Страница профиля</h1>
            <Button onClick={handleLogout} type="button" aria-label="Выйти" variant="primary">
                Выйти
            </Button>
        </main>
    );
};
