import * as z from 'zod';

export const requestOtpSchema = z.object({
	phone: z
		.string()
		.min(1, 'Введите номер телефона')
		.transform((num) => num.replace(/\D/g, ''))
		.refine((phone) => phone.length === 11 && phone.startsWith('7'), 'Некорректный номер телефона')
		.transform((num) => num.replace(/^7/, '8'))
});

export type RequestOtpFormData = z.input<typeof requestOtpSchema>;
export type RequestOtpApiData = z.output<typeof requestOtpSchema>; 