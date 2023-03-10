/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';
import ttypescript from 'ttypescript';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/

export default defineConfig({
    plugins: [
        react(),
        typescript({
            typescript: ttypescript,
        }),
        viteTsconfigPaths(),
        svgrPlugin()
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/test/setupTests.ts',
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'html', 'json'],
            exclude: [
                'node_modules/',
                'src/test/setupTests.ts',
            ],
        },
    },
    build: {
        outDir: 'build',
    },
    server: {
        port: 3000,
        open: true,
    },
});
