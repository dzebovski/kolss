import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/setup.ts',
        include: ['src/__tests__/**/*.test.(ts|tsx)'],
        exclude: ['tests/**', 'playwright/**', 'playwright-report/**'],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './'),
        },
    },
});
