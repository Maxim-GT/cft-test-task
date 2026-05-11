import { useSessionStore } from '@/entities/session';
import { AuthWidget, type AuthStep } from '@/widgets/auth-widget';
import type { JSX } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import styles from './auth-page.module.css';
import { Loader } from '@/shared/ui';

export const AuthPage = (): JSX.Element => {
	const phone = useSessionStore((state) => state.phone);
	const status = useSessionStore((state) => state.status);
	const isHydrated = useSessionStore((s) => s.isHydrated);
	const isAuthReady = useSessionStore((s) => s.isAuthReady);
	const [searchParams] = useSearchParams();

	const isCodeAllowed = Boolean(phone) && status === 'otp_sent';

	const rawStep = searchParams.get('step');
	const currentStep: AuthStep = rawStep === 'code' ? 'code' : 'phone';

	if (!isHydrated || !isAuthReady) {
		return <main><Loader size='lg' /></main>;
	}

	if (currentStep === 'code' && !isCodeAllowed) {
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
