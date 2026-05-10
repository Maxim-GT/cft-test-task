import { useSessionStore } from '@/entities/session';
import { RequestOtpForm } from '@/features';
import { CheckOtpForm } from '@/features/check-otp/ui/check-otp-form';
import type { JSX } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

type AuthStep = 'phone' | 'code';

function normalizeStep(step: string | null): AuthStep {
    return step === 'code' ? 'code' : 'phone';
}

export const AuthPage = (): JSX.Element => {
    const phone = useSessionStore((state) => state.phone);
    const status = useSessionStore((state) => state.status);
    const isHydrated = useSessionStore((s) => s.isHydrated);
    const isAuthReady = useSessionStore((s) => s.isAuthReady);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const step = normalizeStep(searchParams.get('step'));
    const isCodeAllowed = Boolean(phone) && status === 'otp_sent';

    const rawStep = searchParams.get('step');
    const currentStep: AuthStep = rawStep === 'code' ? 'code' : 'phone';

    if (!isHydrated || !isAuthReady) {
        return <main>Загрузка...</main>;
    }

    if (currentStep === 'code' && !isCodeAllowed) {
        return <Navigate to="/auth?step=phone" replace />;
    }

    if (currentStep === 'phone' && isCodeAllowed) {
        return <Navigate to="/auth?step=code" replace />;
    }

    return (
        <main>
            {step === 'phone' ? (
                <RequestOtpForm
                    onSuccess={() => void navigate('/auth?step=code', { replace: false })}
                />
            ) : (
                <CheckOtpForm onSuccess={() => void navigate('/profile', { replace: true })} />
            )}
        </main>
    );
};
