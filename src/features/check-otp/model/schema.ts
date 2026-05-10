import * as z from 'zod';

export const checkOtpSchema = z.object({
	code: z
		.string()
		.min(1, 'Код должен содержать 6 цифр')
		.length(6, 'Код должен содержать 6 цифр')
		.regex(/^\d{6}$/, 'Код должен содержать 6 цифр')
		.transform((num) => Number(num)),
});

export type CheckOtpFormData = z.input<typeof checkOtpSchema>;
export type CheckOtpApiData = z.output<typeof checkOtpSchema>; 