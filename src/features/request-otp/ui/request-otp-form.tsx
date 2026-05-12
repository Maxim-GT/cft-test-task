import { Button, Input, Loader } from '@/shared/ui';
import type { RequestOtpFormProps } from '../model/types';
import { useRequestOtp } from '../model/use-request-otp';
import { Controller } from 'react-hook-form';
import { useEffect, type JSX } from 'react';
import { toast } from 'sonner';
import { phoneToRuFormat } from '@/shared/lib';
import { useSessionStore } from '@/entities/session';

export function RequestOtpForm(props: RequestOtpFormProps): JSX.Element {
	const { form, onSubmit, isLoading, error } = useRequestOtp(props);
	const phoneError = form.formState.errors.phone?.message;
	const resetPhoneState = useSessionStore((state) => state.resetPhoneState);
	const status = useSessionStore((state) => state.status);

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
						aria-label="Номер телефона для входа"
						value={field.value ?? ''}
						onChange={(e) => {
							if (status === 'otp_sent') {
								resetPhoneState();
								form.reset({ phone: '' });
							}
							field.onChange(phoneToRuFormat(e.target.value))
						}}
						onBlur={field.onBlur}
						ref={field.ref}
						placeholder="Телефон"
						error={phoneError}
					/>
				)}
			/>

			<Button type="submit" disabled={isLoading} aria-label={isLoading ? 'Отправка кода, подождите' : 'Запросить код'}>
				{isLoading ? <Loader size="sm" aria-hidden /> : 'Продолжить'}
			</Button>
		</form>
	);
}
