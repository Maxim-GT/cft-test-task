export interface CheckOtpFormProps {
	displayPhone?: string;
	onBack?: () => void;
	onSuccess?: () => void;
	onResend?: () => void;
	className?: string;
}