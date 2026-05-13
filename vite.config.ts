import { defineConfig } from 'vitest/config'; // Меняем источник импорта
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: [path.resolve(__dirname, './src/shared/lib/test/setup.ts')],
	},
});