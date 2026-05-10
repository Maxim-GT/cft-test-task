import { useSessionStore } from "@/entities/session";
import type { CheckOtpFormProps } from "./types";
import { useForm } from 'react-hook-form';
import { checkOtpSchema, type CheckOtpApiData, type CheckOtpFormData } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

export function useCheckOtp(props: CheckOtpFormProps) {
	const signIn = useSessionStore((state) => state.signIn);
	const logout = useSessionStore((s) => s.logout);
	const requestOtp = useSessionStore((s) => s.requestOtp);
	const isLoading = useSessionStore((s) => s.isLoading);
	const phone = useSessionStore((state) => state.phone);
	const error = useSessionStore((s) => s.error);
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
		mode: 'onSubmit'
	});

	const onSubmit = form.handleSubmit(async (value) => {
		const isOk = await signIn(value.code);

		if (!isOk) {
			return;
		}

		props.onSuccess?.();
	});

	const onResend = async () => {
		if (canResend && phone) {
			const isOk = await requestOtp(phone);

			if (!isOk) {
				return;
			}

			props.onResend?.();
		}
	}

	const onBack = () => {
		logout();
		props.onBack?.();
	}

	return {
		form,
		onSubmit,
		onBack,
		onResend,
		isLoading,
		error,
		secondsLeft,
		canResend
	}
}