import * as z from 'zod';

export const checkOtpSchema = z.object({
	code: z
		.string()
		.min(1, 'Введите код')
		.length(6, 'Некорректный код')
		.regex(/^\d{6}$/, 'Некорректный код')
		.transform((num) => Number(num)),
});

export type CheckOtpFormData = z.input<typeof checkOtpSchema>;
export type CheckOtpApiData = z.output<typeof checkOtpSchema>; 