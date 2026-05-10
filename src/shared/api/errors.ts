import axios from 'axios';
import type { IBaseResponse } from './auth/types';

export type ApiErrorCode = 'BUSINESS_ERROR' | 'HTTP_ERROR' | 'NETWORK_ERROR' | 'UNKNOWN_ERROR';

export class ApiError extends Error {
	code: ApiErrorCode;
	status?: number;
	details?: unknown;

	constructor(message: string, code: ApiErrorCode, status?: number, details?: unknown) {
		super(message);
		this.name = 'ApiError';
		this.code = code;
		this.status = status;
		this.details = details;
	}
}

function isBaseResponse(data: unknown): data is IBaseResponse {
	return (
		typeof data === 'object' &&
		data !== null &&
		'success' in data &&
		typeof (data as IBaseResponse).success === 'boolean'
	);
}

export function throwWhenBusinessError(data: unknown): void {
	if (!isBaseResponse(data)) {
		return;
	}

	if (!data.success) {
		throw new ApiError(
			data.reason ?? 'Ваш запрос был отклонен на сервере',
			'BUSINESS_ERROR',
			undefined,
			data,
		);
	}
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as Record<string, unknown>).message === 'string'
	);
}

export function normalizeApiError(error: unknown): ApiError {
	if (axios.isAxiosError(error)) {
		if (!error.response) {
			return new ApiError('Ошибка сети. Пожалуйста, проверьте подключение', 'NETWORK_ERROR');
		}
		const status = error.response.status;
		const responseData = error.response.data as IBaseResponse | undefined;
		const reason = responseData?.reason ?? `HTTP ${status}`;

		return new ApiError(reason, 'HTTP_ERROR', status);
	}

	if (error instanceof ApiError) {
		return error;
	}

	if (error instanceof Error) {
		return new ApiError(error.message, 'UNKNOWN_ERROR');
	}
	return new ApiError('Возникла неизвестная ошибка', 'UNKNOWN_ERROR');
}
