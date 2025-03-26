import { type CodeToHastOptions, createHighlighterCore, type HighlighterCore } from 'shiki/core';
import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import githubDarkDefault from 'shiki/themes/github-dark-default.mjs';
import githubLightDefault from 'shiki/themes/github-light-default.mjs';

let highlighterInstance: HighlighterCore | null = null;
let highlighterPromise: null | Promise<HighlighterCore> = null;

async function createHighlighterInstance() {
	// Return existing instance if available
	if (highlighterInstance) return highlighterInstance;

	// Return in-progress initialization if one exists
	if (highlighterPromise) return highlighterPromise;

	// Create new initialization promise
	highlighterPromise = createHighlighterCore({
		engine: createOnigurumaEngine(import('shiki/wasm')),
		langs: [import('shiki/langs/svelte.mjs'), import('shiki/langs/zsh.mjs')],
		themes: [githubDarkDefault, githubLightDefault]
	}).then((instance) => {
		highlighterInstance = instance;
		return instance;
	});

	return highlighterPromise;
}

export async function highlighterSvelte(
	code: string,
	options: Omit<Partial<CodeToHastOptions>, 'lang' | 'theme' | 'themes'> = {}
) {
	const instance = await createHighlighterInstance();

	const html = instance.codeToHtml(code, {
		lang: 'svelte',
		meta: {
			'data-lang': 'svelte'
		},
		themes: {
			dark: 'github-dark-default',
			light: 'github-light-default'
		},
		...options
	});

	return html;
}

export async function highlighterZsh(
	code: string,
	options: Omit<Partial<CodeToHastOptions>, 'lang' | 'theme' | 'themes'> = {}
) {
	const instance = await createHighlighterInstance();
	return instance.codeToHtml(code, {
		lang: 'zsh',
		meta: {
			'data-lang': 'zsh'
		},
		themes: {
			dark: 'github-dark-default',
			light: 'github-light-default'
		},
		...options
	});
}
