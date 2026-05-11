import { useSessionStore } from '@/entities/session';
import { HelperText, Input, Title } from '@/shared/ui';
import { useMemo, useState, type JSX } from 'react';
import styles from './auth-widget.module.css'
import { RequestOtpForm } from '@/features';
import { CheckOtpForm } from '@/features/check-otp';
import { useNavigate } from 'react-router-dom';
import type { AuthWidgetProps } from '../model/types';
import { phoneToRuFormat } from '@/shared/lib';

export function AuthWidget({ step }: AuthWidgetProps): JSX.Element {
	const navigate = useNavigate();
	const phoneFromSore = useSessionStore((s) => s.phone);
	const [displayPhone, setDisplayPhone] = useState<string>('');
	const isOtpStep = step === 'code';

	const phoneForOtp = useMemo(() => {
		if (displayPhone) {
			return displayPhone;
		}
		return phoneFromSore ? phoneToRuFormat(phoneFromSore) : '';
	}, [displayPhone, phoneFromSore]);

	const content = {
		title: 'Вход',
		helperText: isOtpStep
			? (
				<>
					Введите проверочный код для входа
					<br />
					в личный кабинет
				</>
			)
			: (
				<>
					Введите номер телефона для входа
					<br />
					в личный кабинет
				</>
			)
	};

	return (
		<section className={styles.section}>
			<header className={styles.header}>
				<Title>{content.title}</Title>
				<HelperText>{content.helperText}</HelperText>
			</header>
			<div className={styles.formWrapper}>
				{!isOtpStep ? (
					<RequestOtpForm
						initialPhone={phoneToRuFormat(phoneFromSore) || ''}
						onSentDisplayPhone={(formatted) => setDisplayPhone(formatted)}
						onSuccess={() => navigate('/auth?step=code')}
					/>
				) : (
					<>
						<Input
							value={phoneForOtp}
							readOnly
							className={styles.displayInput}
							tabIndex={-1}
						/>
						<CheckOtpForm
							displayPhone={displayPhone}
						/>
					</>
				)}
			</div>
		</section>
	);
};