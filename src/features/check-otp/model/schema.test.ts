import { describe, expect, it } from 'vitest';
import { checkOtpSchema } from './schema';

describe('requestOtpSchema', () => {
	it('валидный код трансформируется в формат апи', () => {
		const res = checkOtpSchema.safeParse({
			code: '123456'
		});

		expect(res.success).toBe(true);

		if (!res.success) {
			return;
		}

		expect(res.data.code).toBe(123456)
	});

	it.each([
		[{ code: '' }, 'Код должен содержать 6 цифр'],
		[{ code: '1' }, 'Код должен содержать 6 цифр',],
		[{ code: '12345' }, 'Код должен содержать 6 цифр',],
		[{ code: '1234567' }, 'Код должен содержать 6 цифр',],
		[{ code: 'abc123' }, 'Код должен содержать 6 цифр',],
	])('отклонить невалидный код %o', (input, message) => {
		const result = checkOtpSchema.safeParse(input)

		expect(result.success).toBe(false);

		if (result.success) {
			return;
		};

		expect(result.error.issues[0].message).toBe(message);
	});
})