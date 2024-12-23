import { defineConfig } from 'vitest/config';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import type { PluginOption, ModuleNode } from 'vite';
import { svelteTesting } from '@testing-library/svelte/vite';

// Custom plugin for HMR optimization
// This is my first plugin, so I'm not sure if it's the best way to do this
// You can always disable it by removing the plugin from the plugins array
const asyncComponentHMR = (): PluginOption => ({
	name: 'async-component-hmr',
	enforce: 'post',
	handleHotUpdate({ file, server, modules }) {
		// Only handle Svelte components in the components directory
		if (file.endsWith('.svelte') && file.includes('/components/')) {
			// Get all importers of this module
			const updatedComponent = modules.find((m) => m.file === file);

			if (!updatedComponent) return;

			const importers = Array.from(updatedComponent.importers);

			// Check if this component is loaded through async-component-loader
			const isAsyncLoaded = importers.some((imp: ModuleNode) => {
				const importerFile = imp.file || '';
				return (
					importerFile.includes('async-component-loader.svelte') ||
					Array.from(imp.importers).some((m) => m.file?.includes('async-component-loader.svelte'))
				);
			});

			// Only handle HMR for async-loaded components
			if (isAsyncLoaded) {
				return [updatedComponent];
			}
		}
	}
});

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		svelteTesting(),
		Icons({
			compiler: 'svelte'
		}),
		asyncComponentHMR()
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
