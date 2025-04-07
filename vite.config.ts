import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vitest/config';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		svelteTesting(),
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
		include: ['src/**/*.{test,test.svelte,spec}.{js,ts}'],
		environment: 'jsdom',
		includeSource: ['src/**/*.{js,ts,svelte}'],
		setupFiles: ['./setupTest.ts'],
		globals: true,
		coverage: {
			exclude: ['./setupTest.ts']
		}
	}
});
