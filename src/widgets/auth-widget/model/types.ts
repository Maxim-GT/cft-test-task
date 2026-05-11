export type AuthStep = 'phone' | 'code';

export interface AuthWidgetProps {
	step: AuthStep;
}