export const authQueryKeys = {
	all: ['auth'] as const,

	session: () => [...authQueryKeys.all, 'session'] as const,

	profile: () => [...authQueryKeys.all, 'profile'] as const,

	otp: () => [...authQueryKeys.all, 'otp'] as const,
};