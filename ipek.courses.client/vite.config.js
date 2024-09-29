import { fileURLToPath, URL } from 'node:url';

import plugin from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import { env } from 'process';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const baseFolder =
	env.APPDATA !== undefined && env.APPDATA !== ''
		? `${env.APPDATA}/ASP.NET/https`
		: `${env.HOME}/.aspnet/https`;

const certificateName = 'ipek.courses.client';
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
	if (
		0 !==
		child_process.spawnSync(
			'dotnet',
			[
				'dev-certs',
				'https',
				'--export-path',
				certFilePath,
				'--format',
				'Pem',
				'--no-password',
			],
			{ stdio: 'inherit' },
		).status
	) {
		throw new Error('Could not create certificate.');
	}
}

// const target = env.ASPNETCORE_HTTPS_PORT
// 	? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
// 	: env.ASPNETCORE_URLS
// 		? env.ASPNETCORE_URLS.split(';')[0]
// 		: 'https://localhost:7142';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [plugin(), tsconfigPaths()],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
			'@img': fileURLToPath(new URL('./src/common/assets/img', import.meta.url)),
			'@assets': fileURLToPath(new URL('./src/common/assets', import.meta.url)),
		},
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:5035/api',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
		port: 5173,
		https: {
			key: fs.readFileSync(keyFilePath),
			cert: fs.readFileSync(certFilePath),
		},
	},
	css: {
		postcss: {
			plugins: [autoprefixer({})],
		},
	},
});
