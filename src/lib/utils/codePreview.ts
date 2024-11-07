import type { Element } from 'hast';

import { h } from 'hastscript';
import {
	type CodeToHastOptions,
	createHighlighterCore,
	type HighlighterCore,
	type ShikiTransformer
} from 'shiki/core';
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
		langs: [import('shiki/langs/svelte.mjs')],
		themes: [githubDarkDefault, githubLightDefault]
	}).then((instance) => {
		highlighterInstance = instance;
		return instance;
	});

	return highlighterPromise;
}

interface CollapsibleSection {
	end?: { characterEnd: number; characterStart: number; line: Element };
	start: { characterEnd: number; characterStart: number; line: Element };
}

function createCollapsibleSectionTransformer(
	startRegex: RegExp,
	endRegex: RegExp
): ShikiTransformer {
	return {
		code(code) {
			const lines = code.children.filter((i) => i.type === 'element') as Element[];

			const collapsibleSectionsMap = new Map<number, CollapsibleSection>();

			lines.forEach((line, idx) => {
				for (const child of line.children) {
					if (child.type !== 'element') continue;
					const text = child.children[0];
					if (text.type !== 'text') continue;

					if (startRegex.test(text.value)) {
						const section = {
							end: undefined,
							start: { characterEnd: text.value.length, characterStart: 0, line }
						};
						collapsibleSectionsMap.set(idx, section);
					}

					if (endRegex.test(text.value)) {
						const openSection = Array.from(collapsibleSectionsMap.values()).find((s) => !s.end);
						if (!openSection) continue;

						openSection.end = {
							characterEnd: text.value.length,
							characterStart: 0,
							line
						};
					}
				}
			});

			if (collapsibleSectionsMap.size === 0) return code;

			const collapsibleSections = Array.from(collapsibleSectionsMap.entries());
			for (let i = collapsibleSections.length - 1; i >= 0; i--) {
				const [_idx, section] = collapsibleSections[i];
				const { end, start } = section;
				if (!end) continue; // Skip sections without an end

				const startLineIdx = code.children.indexOf(start.line);
				const endLineIdx = code.children.indexOf(end.line);
				const linesBetween = code.children.slice(startLineIdx + 1, endLineIdx);

				const linesBetweenContent = linesBetween
					.filter((line) => line.type === 'element' || line.type === 'text')
					.filter((line) => (line.type === 'element' ? line.children.length > 0 : true));

				const wrapperDiv = h(
					'div',
					{
						class: 'collapsed-section-wrapper',
						'data-open': 'false'
					},
					[
						h(
							'button',
							{
								class: 'collapsible-toggle',
								onclick: `
									this.parentElement.dataset.open === 'true' ? this.parentElement.dataset.open = 'false' : this.parentElement.dataset.open = 'true'
									this.textContent = this.parentElement.dataset.open === 'true' ? 'Collapse code 📕' : 'Expand code 📖'
									this.parentElement.focus()
								`
							},
							'Expand code 📖'
						),
						h('span', { class: 'collapsed-section' }, linesBetweenContent)
					]
				);

				code.children[startLineIdx] = wrapperDiv;
				code.children.splice(startLineIdx + 1, linesBetween.length + 1);
			}

			return code;
		}
	};
}

const collapsibleSectionTransformer = createCollapsibleSectionTransformer(
	/\s*(?:\/\/|\/\*|<!--|[#"']|--|%{1,2}|;{1,2})\s+\[!code collapse-start\]\s*(?:(?:\*\/|-->)\s*)?$/,
	/\s*(?:\/\/|\/\*|<!--|[#"']|--|%{1,2}|;{1,2})\s+\[!code collapse-end\]\s*(?:(?:\*\/|-->)\s*)?$/
);

async function highlighter(
	code: string,
	options: Omit<Partial<CodeToHastOptions>, 'lang' | 'theme' | 'themes'> = {}
) {
	const instance = await createHighlighterInstance();

	const html = instance.codeToHtml(code, {
		lang: 'svelte',
		themes: {
			dark: 'github-dark-default',
			light: 'github-light-default'
		},
		transformers: [collapsibleSectionTransformer],
		...options
	});

	return html;
}

export default highlighter;
