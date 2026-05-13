import { describe, expect, it } from 'vitest';
import { requestOtpSchema } from './schema';

describe('requestOtpSchema', () => {
	it('валидный телефон трансформируется в формат апи', () => {
		const res = requestOtpSchema.safeParse({
			phone: '+7 (111) 111-11-11'
		});

		expect(res.success).toBe(true);

		if (!res.success) {
			return;
		}

		expect(res.data.phone).toBe('81111111111')
	});

	it.each([
		[{ phone: '' }, 'Поле является обязательным'],
		[{ phone: '123' }, 'Некорректный номер телефона',],
		[{ phone: '+7 (111) 111-11-1' }, 'Некорректный номер телефона']
	])('отклонить невалидный телефон %o', (input, message) => {
		const result = requestOtpSchema.safeParse(input)

		expect(result.success).toBe(false);

		if (result.success) {
			return;
		};

		expect(result.error.issues[0].message).toBe(message);
	});
})