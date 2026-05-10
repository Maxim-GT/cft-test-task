import { useSessionStore } from '@/entities/session';
import type { RequestOtpFormProps } from './types';
import { useForm } from 'react-hook-form';
import { requestOtpSchema, type RequestOtpFormData } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';

export function useRequestOtp(props: RequestOtpFormProps) {
    const requestOtp = useSessionStore((s) => s.requestOtp);
    const isLoading = useSessionStore((s) => s.isLoading);
    const error = useSessionStore((s) => s.error);
    const getMsUntilRetry = useSessionStore((s) => s.getMsUntilRetry);
    const msUntilRetry = getMsUntilRetry();
    const secondsLeft = Math.ceil(msUntilRetry / 1000);
    const canResend = msUntilRetry === 0;

    const form = useForm<RequestOtpFormData>({
        resolver: zodResolver(requestOtpSchema),
        defaultValues: { phone: props.initialPhone ?? '' },
        mode: 'onSubmit',
    });

    const onSubmit = form.handleSubmit(async (value) => {
        const isOk = await requestOtp(value.phone);

        if (!isOk) {
            return;
        }

        props.onSentApiPhone?.(value);
        props.onSentDisplayPhone?.(form.getValues('phone'));
        props.onSuccess?.();
    });

    return {
        form,
        onSubmit,
        isLoading,
        error,
        secondsLeft,
        canResend,
    };
}
