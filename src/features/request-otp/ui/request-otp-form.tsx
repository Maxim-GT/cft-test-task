import { Button, Input } from '@/shared/ui';
import type { RequestOtpFormProps } from '../model/types';
import { useRequestOtp } from '../model/use-request-otp';
import { Controller } from 'react-hook-form';
import { useEffect, type JSX } from 'react';
import { toast } from 'sonner';
import { phoneToRuFormat } from '../lib/phone-to-ru-format';

export function RequestOtpForm(props: RequestOtpFormProps): JSX.Element {
    const { form, onSubmit, isLoading, error } = useRequestOtp(props);
    const phoneError = form.formState.errors.phone?.message;

    useEffect(() => {
        if (!error) {
            return;
        }
        toast.error(error);
    }, [error]);

    return (
        <form onSubmit={onSubmit} noValidate>
            <Controller
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <Input
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(phoneToRuFormat(e.target.value))}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        placeholder="Телефон"
                        error={phoneError}
                    />
                )}
            />

            <Button type="submit" disabled={isLoading}>
                Продолжить
            </Button>
        </form>
    );
}
