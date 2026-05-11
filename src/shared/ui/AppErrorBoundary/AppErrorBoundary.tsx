import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import type { PropsWithChildren } from 'react';
import { ApiError } from '@/shared/api/errors';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	function renderMessage() {
		if (error instanceof ApiError) {
			switch (error.code) {
				case 'NETWORK_ERROR':
					return 'Проблема с подключением к интернету';

				case 'HTTP_ERROR':
					return 'Ошибка сервера. Попробуйте позже';

				case 'BUSINESS_ERROR':
					return error.message;

				default:
					return 'Произошла неизвестная ошибка';
			}
		}

		return 'Что-то пошло не так';
	};

	return (
		<main>
			<h1>Ошибка приложения</h1>
			<p>{renderMessage()}</p>
			{error instanceof Error && (
				<pre>{error.stack}</pre>
			)}
			<button onClick={resetErrorBoundary}>
				Попробовать снова
			</button>
		</main >
	);
}

export function AppErrorBoundary({ children }: PropsWithChildren) {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}>
			{children}
		</ErrorBoundary>
	);
};