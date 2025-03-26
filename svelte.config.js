import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		warningFilter: (warning) => {
			if (warning.code === 'a11y_img_redundant_alt') return false;
		}
	},
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$assets: './src/lib/assets',
			$data: './src/lib/data',
			$helpers: './src/lib/helpers',
			$lib: './src/lib'
		},
		prerender: {
			handleMissingId: 'ignore'
		}
	},

	// Consult https://svelte.dev/docs/kit/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess()
};

export default config;
