import axios from 'axios';
import type { IBaseResponse } from './auth/types';

export type ApiErrorCode =
	'BUSINESS_ERROR'
	| 'HTTP_ERROR'
	| 'NETWORK_ERROR'
	| 'UNKNOWN_ERROR';

export class ApiError extends Error {
	code: ApiErrorCode;
  	status?: number;
	details?: unknown;

	constructor(
		message: string,
		code: ApiErrorCode,
		status?: number,
		details?: unknown,
	) {
		super(message);
		this.name = 'ApiError';
		this.code = code;
		this.status = status;
		this.details = details;
	}
}

export function throwWhenBusinessError(data: IBaseResponse): void {
	if (!data.success) {
		throw new ApiError(data.reason ?? 'Ваш запрос был отклонен на сервере', 'BUSINESS_ERROR', undefined, data)
	}
}

export function normalizeApiError(error: unknown): ApiError {
	if (axios.isAxiosError(error)) {
		if (!error.response) {
			return new ApiError('Ошибка сети. Пожалуйста, проверьте подключение', 'NETWORK_ERROR');
		}
		const status = error.response.status;
		const responseData = error.response.data as IBaseResponse | undefined;
		const reason = responseData?.reason ?? `HTTP ${status}`;

		return new ApiError(reason, 'HTTP_ERROR', status)
	}

	if (error instanceof ApiError) {
		return error;
	}

	if (error instanceof Error) {
		return new ApiError(error.message, 'UNKNOWN_ERROR');
	}
	return new ApiError('Возникла неизвестная ошибка', 'UNKNOWN_ERROR')
}

