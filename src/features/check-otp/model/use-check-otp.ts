import { useRequestOtpMutation, useSessionStore, useSignInMutation } from '@/entities/session';
import type { ICheckOtpFormProps } from './types';
import { useForm } from 'react-hook-form';
import { checkOtpSchema, type CheckOtpApiData, type CheckOtpFormData } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { ApiError } from '@/shared/api';
import { toast } from 'sonner';

export function useCheckOtp(props: ICheckOtpFormProps) {
	const signInMutation = useSignInMutation();
	const requestOtpMutation = useRequestOtpMutation();
	const phone = useSessionStore((state) => state.phone);
	const getMsUntilRetry = useSessionStore((s) => s.getMsUntilRetry);
	const msUntilRetry = getMsUntilRetry();
	const retryAt = useSessionStore((state) => state.retryAt);
	const secondsLeft = Math.ceil(msUntilRetry / 1000);
	const canResend = msUntilRetry === 0 && !!phone;

	const [, setTick] = useState(0);

	useEffect(() => {
		if (!retryAt) {
			return;
		}

		const intervalId = setInterval(() => {
			if (getMsUntilRetry() <= 0) {
				clearInterval(intervalId);
			}
			setTick((t) => t + 1);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [retryAt, getMsUntilRetry]);

	const form = useForm<CheckOtpFormData, undefined, CheckOtpApiData>({
		resolver: zodResolver(checkOtpSchema),
		defaultValues: { code: '' },
		mode: 'onSubmit',
	});

	const onSubmit = form.handleSubmit(async (value) => {
		try {
			await signInMutation.mutateAsync(value.code);
			props.onSuccess?.();
		} catch (err) {
			if (err instanceof ApiError) {
				if (err.code === 'NETWORK_ERROR') {
					toast.error(err.message);
					return;
				}

				form.setError('code', {
					type: 'server',
					message: err.message,
				});
				return;
			}

			toast.error('Произошла ошибка авторизации');
		}
	});

	const onResend = async () => {
		if (canResend && phone) {
			await requestOtpMutation.mutateAsync(phone);
			props.onResend?.();
		}
	};

	return {
		form,
		onSubmit,
		onResend,
		isLoading: requestOtpMutation.isPaused || signInMutation.isPending,
		secondsLeft,
		canResend,
	};
}
