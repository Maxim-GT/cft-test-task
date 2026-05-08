import { useSessionStore } from '@/entities/session';
import { useEffect, type JSX } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type AuthStep = 'phone' | 'code';

function normalizeStep(step: string | null): AuthStep {
  return step === 'code' ? 'code' : 'phone';
}

export const AuthPage = (): JSX.Element => {
  const phone = useSessionStore((state) => state.phone);
  const status = useSessionStore((state) => state.status);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const step = normalizeStep(searchParams.get('step'));
  const isCodeAllowed = Boolean(phone) && status === 'otp_sent';

  useEffect(() => {
    const rawStep = searchParams.get('step');
    if (rawStep !== 'phone' && rawStep !== 'code') {
      void navigate('/auth?step=phone', { replace: true });
    }
  }, [searchParams, navigate]);

  useEffect(() => {
    if (step === 'code' && !isCodeAllowed) {
      void navigate('/auth?step=phone', { replace: true });
    }
  }, [step, isCodeAllowed, navigate]);

  useEffect(() => {
    if (step === 'phone' && isCodeAllowed) {
      void navigate('/auth?step=code', { replace: false });
    }
  }, [step, isCodeAllowed, navigate]);

  return (
    <main>
      <h1>Страница авторизации</h1>
    </main>
  );
};

