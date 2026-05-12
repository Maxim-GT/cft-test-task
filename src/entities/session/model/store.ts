import type { IUserDto } from '@/shared/api/auth/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthStatus = 'anonymous' | 'otp_sent' | 'authenticated';

interface ISessionState {
	user: IUserDto | null;
	token: string | null;
	status: AuthStatus;
	phone: string | null;
	retryAt: number | null;
	error: string | null;
	isLoading: boolean;

	isHydrated: boolean;
	isLoadingSession: boolean;
	isAuthReady: boolean;

	logout: () => void;
	clearError: () => void;
	getMsUntilRetry: () => number;
	setIsHydrated: (value: boolean) => void;
	resetPhoneState: () => void;
}

export const useSessionStore = create<ISessionState>()(
	persist(
		(set, get) => ({
			user: null,
			token: null,
			status: 'anonymous',
			phone: null,
			retryAt: null,
			isLoading: false,
			error: null,

			isHydrated: false,
			isLoadingSession: false,
			isAuthReady: false,

			logout: () => {
				set({
					user: null,
					token: null,
					status: 'anonymous',
					phone: null,
					retryAt: null,
					isLoading: false,
					error: null,
				});
			},

			clearError: () => {
				set({ error: null });
			},

			getMsUntilRetry: () => {
				const retryAt = get().retryAt;
				if (!retryAt) {
					return 0;
				}
				return Math.max(0, retryAt - Date.now());
			},

			setIsHydrated: (value) =>
				set({
					isHydrated: value,
				}),

			resetPhoneState: () => {
				set({
					status: 'anonymous',
					phone: null,
					retryAt: null,
					error: null
				})
			}
		}),
		{
			name: 'session-store',
			storage: createJSONStorage(() => sessionStorage),
			partialize: (state) => ({
				user: state?.user,
				token: state?.token,
				status: state?.status,
				phone: state.phone,
				retryAt: state.retryAt,
			}),
			onRehydrateStorage: () => (state) => {
				if (state) {
					state?.setIsHydrated(true);
				}
			},
		},
	),
);
