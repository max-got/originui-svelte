import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig, type PluginOption } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit(),
		Icons({
			compiler: 'svelte'
		})
	]
});
