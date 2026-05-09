import type { IUserDto } from '@/shared/api/auth/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService } from '../api/authService';

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
	isAuthReady: boolean

	requestOtp: (phone: string) => Promise<boolean>;
	signIn: (code: number) => Promise<boolean>;
	getSession: () => Promise<boolean>;
	logout: () => void;
	clearError: () => void;
	getMsUntilRetry: () => number;
	setIsHydrated: (value: boolean) => void;
	initializeAuth: () => Promise<void>;
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

			requestOtp: async (phone) => {
				const msUntilRetry = get().getMsUntilRetry();

				if (msUntilRetry > 0) {
					set({
						error: `Повторная отправка доступна через ${Math.ceil(msUntilRetry / 1000)} сек.`,
					})
					return false;
				}

				set({isLoading: true, error: null});
				
				try {
					const data = await authService.sendOtp({phone});

					if (!data.success) {
						set({
							isLoading: false,
							error: data.reason ?? "Не удалось отправить код, попробуйте позже"
						});
						return false;
					}

					set({
						phone,
						status: 'otp_sent',
						retryAt: Date.now() + data.retryDelay,
						isLoading: false,
						error: null
					})
					return true;
				} catch {
					set({
						isLoading: false,
						error: 'Возникла ошибка во время отправки кода, пожалуйста, попробуйте позже',
					});
					return false;
				}
			},
			signIn: async (code) => {
				const phone = get().phone;
				if (!phone) {
					set({ error: 'Сначала запросите код' });
					return false;
				}

				set({isLoading: true, error: null});

				try {
					const data = await authService.signIn({phone, code});

					if (!data.success) {
						set({
							isLoading: false,
							error: data.reason ?? "Неверный код, введите другой"
						});
						return false;
					}

					set({
						user: data.user,
						token: data.token,
						status: 'authenticated',
						phone: null,
						retryAt: null,
						isLoading: false,
						error: null
					})

					return true;
				} catch {
					set({
						isLoading: false,
						error: 'Возникла ошибка во время аутентификации',
					});
					return false;
				}
			},
			getSession: async () => {
				const token = get().token;
				if (!token) {
					set({ user: null, status: 'anonymous' });
					return false;
				}

				set({ isLoading: true, error: null });

				try {
					const data = await authService.getSession();
					if (!data.success) {
						set({
							user: null,
							token: null,
							status: 'anonymous',
							isLoading: false,
							error: data.reason ?? 'Даная сессия недействительна',
						});
						return false;
					}

					set({
						user: data.user,
						status: 'authenticated',
						isLoading: false,
						error: null
					})
					return true;

				} catch {
					set({
						user: null,
						token: null,
						status: 'anonymous',
						isLoading: false,
						error: 'Возникла ошибка во время проверки сессии',
					});
					return false;
				}
				
			},
			logout: () => {
				set({
					user: null,
					token: null,
					status: 'anonymous',
					phone: null,
					retryAt: null,
					isLoading: false,
					error: null,
				})
			},

			clearError: () => {
				set({ error: null })
			},

			getMsUntilRetry: () => {
				const retryAt = get().retryAt;
				if (!retryAt) {
					return 0;
				}
				return Math.max(0, retryAt - Date.now());
			},
			initializeAuth: async () => {
				if (get().isLoadingSession || get().isAuthReady) {
					return;
				}

				set({isLoadingSession: true});

				try {
					const token = get().token;

					if (!token) {
						set({ user: null, status: 'anonymous' });
            			return;
					}

					await get().getSession();
				} finally {
					set({
						isLoadingSession: false,
						isAuthReady: true,
					})
				}
			},

			setIsHydrated: (value) => set({
				isHydrated: value
			})
			
		}),
		{
			name: 'session-store',
			partialize: (state) => ({
				user: state?.user,
				token: state?.token,
				status: state?.token ? 'authenticated' : 'anonymous',
			}),
			onRehydrateStorage: () => (state, error) => {
				state?.setIsHydrated(true);	
							
				if (error) {
					state?.setIsHydrated(true);	
				};
			},
		}
	)
)