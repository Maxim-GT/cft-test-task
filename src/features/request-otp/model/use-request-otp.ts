import { useRequestOtpMutation, useSessionStore } from '@/entities/session';
import type { RequestOtpFormProps } from './types';
import { useForm } from 'react-hook-form';
import { requestOtpSchema, type RequestOtpFormData } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiError } from '@/shared/api';
import { toast } from 'sonner';

export function useRequestOtp(props: RequestOtpFormProps) {
    const mutation = useRequestOtpMutation();
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
        try {
            await mutation.mutateAsync(value.phone);

            props.onSentApiPhone?.(value);
            props.onSentDisplayPhone?.(form.getValues('phone'));
            props.onSuccess?.();
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.code === 'BUSINESS_ERROR') {
                    return;
                }
                toast.error(error.message);
                return;
            }
            toast.error('Не удалось отправить код');
        }
    });

    return {
        form,
        onSubmit,
        isLoading: mutation.isPending,
        error: mutation.error?.message,
        secondsLeft,
        canResend,
    };
}
