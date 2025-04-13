/// <reference types="vitest" />
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		Icons({
			compiler: 'svelte'
		})
	],
	build: {
		rollupOptions: {
			onwarn(warning, warn) {
				if (
					warning.code === 'PLUGIN_WARNING' &&
					warning.message.includes('/ui/button.svelte is dynamically imported')
				) {
					warn(
						'Here would be a warning that "button.svelte" is dynamically imported. It is a Core component tho and should be imported statically.'
					);
					return;
				}

				warn(warning);
			}
		}
	},
	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
