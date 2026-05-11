import { useSessionStore } from '@/entities/session';
import { AuthWidget, type AuthStep } from '@/widgets/auth-widget';
import type { JSX } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import styles from './auth-page.module.css';

export const AuthPage = (): JSX.Element => {
	const phone = useSessionStore((state) => state.phone);
	const [searchParams] = useSearchParams();

	const rawStep = searchParams.get('step');
	const currentStep: AuthStep = rawStep === 'code' ? 'code' : 'phone';

	if (currentStep === 'code' && !phone) {
		return <Navigate to="/auth?step=phone" replace />;
	}

	return (
		<main className={styles.page}>
			<div className={styles.container}>
				< AuthWidget step={currentStep} />
			</div>
		</main>
	);
};
