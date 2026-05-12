import { type ChangeEvent, type JSX } from 'react';
import type { ICheckOtpFormProps } from '../model/types';
import { useCheckOtp } from '../model/use-check-otp';
import { Button, HelperText, Input, Loader } from '@/shared/ui';
import { declineRuSeconds } from '../lib/decline-ru-secods';
import styles from './check-otp-form.module.css';

export function CheckOtpForm(props: ICheckOtpFormProps): JSX.Element {
	const { form, onSubmit, onResend, isLoading, secondsLeft, canResend } =
		useCheckOtp(props);

	const codeError = form.formState.errors.code?.message;

	return (
		<form onSubmit={onSubmit} noValidate>
			<Input
				aria-label="Проверочный код из сообщения"
				{...form.register('code', {
					onChange: (e: ChangeEvent<HTMLInputElement>) => {
						const value = e.target.value;
						e.target.value = value.replace(/\D/g, '').slice(0, 6);

						if (form.formState.errors.code) {
							form.clearErrors('code');
						}
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

			<div className={styles.actions}>
				<Button type="submit" disabled={isLoading} aria-label={isLoading ? 'Выполняется вход, подождите' : 'Войти'}>
					{isLoading ? <Loader size="sm" aria-hidden /> : 'Войти'}
				</Button>
				{!canResend ? (
					<HelperText size="sm" className={styles.helperText}>
						Запросить код повторно можно через{' '}
						{` ${secondsLeft} ${declineRuSeconds(secondsLeft, ['секунду', 'cекунды', 'секунд'])}`}
					</HelperText>
				) : (
					<Button variant="secondary" onClick={onResend} type="button" className={styles.secondaryButton} aria-label="Запросить код еще раз">
						Запросить код ещё раз
					</Button>
				)}
			</div>
		</form>
	);
}
