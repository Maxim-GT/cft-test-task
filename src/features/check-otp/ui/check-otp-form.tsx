import { useEffect, type ChangeEvent, type JSX } from 'react';
import type { CheckOtpFormProps } from '../model/types';
import { useCheckOtp } from '../model/use-check-otp';
import { toast } from 'sonner';
import { Button, HelperText, Input } from '@/shared/ui';
import { declineRuSeconds } from '../lib/decline-ru-secods';

export function CheckOtpForm(props: CheckOtpFormProps): JSX.Element {
    const { form, error, onSubmit, onResend, isLoading, secondsLeft, canResend } =
        useCheckOtp(props);
    const codeError = form.formState.errors.code?.message;

    useEffect(() => {
        if (!error) {
            return;
        }
        toast.error(error);
    }, [error]);

    return (
        <form onSubmit={onSubmit} noValidate>
            <Input
                {...form.register('code', {
                    onChange: (e: ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        e.target.value = value.replace(/\D/g, '').slice(0, 6);
                    },
                })}
                placeholder="Проверочный код"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                error={codeError}
                disabled={isLoading}
                maxLength={6}
            />

            <Button type="submit" disabled={isLoading}>
                Войти
            </Button>
            {!canResend ? (
                <HelperText size="sm">
                    Запросить код повторно можно через{' '}
                    {` ${secondsLeft} ${declineRuSeconds(secondsLeft, ['секунду', 'cекунды', 'секунд'])}`}
                </HelperText>
            ) : (
                <Button variant="secondary" onClick={onResend} type="button">
                    Запросить код ещё раз
                </Button>
            )}
        </form>
    );
}
