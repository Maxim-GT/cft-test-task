import { resetAuthState } from '@/entities/session';
import { Button } from '@/shared/ui';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
export const ProfilePage = (): JSX.Element => {
	const navigate = useNavigate();

	const handleLogout = () => {
		resetAuthState();
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
