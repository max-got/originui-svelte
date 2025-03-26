import type {
	EntryGenerator as LLMSEntryGenerator,
	RequestHandler as LLMSRequestHandler
} from '../../../routes/(llms.txt)/llms/[directory=componentDirectory].txt/$types';

import { getComponentDirectories } from '$lib/componentRegistry';

import type { ComponentAPIResponseJSON } from './components/components.handler';

import { API_V1_COMPONENTS_ROUTE } from './components/components.route';
import { llmsMdGenerator } from './llms';

export const API_V1_LLMS_ENDPOINT_HANDLER = {
	entries: (async () => {
		const directories = await getComponentDirectories();
		return directories.map((directory) => ({ directory }));
	}) satisfies LLMSEntryGenerator,
	fallback: (async () => {
		return Response.json(
			{
				message:
					"Components llms.txt not available (yet?). Create a new issue if you need this. Not even sure why you're here."
			},
			{ status: 404 }
		);
	}) satisfies LLMSRequestHandler,
	GET: async (fetch: typeof globalThis.fetch) => {
		return async ({ params, setHeaders }: Omit<Parameters<LLMSRequestHandler>[0], 'fetch'>) => {
			const { directory } = params;

			const componentFiles = await fetch(`${API_V1_COMPONENTS_ROUTE}/${directory}.json`);
			const components = (await componentFiles.json()) as ComponentAPIResponseJSON;

			const systemPrompt = `<SYSTEM>This is the llms.txt documentation for the "${components.meta.directory}" directory of the Origin UI - Svelte project.</SYSTEM>`;

			// Main title and description following llms.txt spec
			const sections = [
				`# "${components.meta.directory}" directory`,
				'',
				'> A collection of production-ready, accessible UI components built with Svelte 5 and Tailwind CSS. These components are designed to be drop-in solutions for rapidly building modern web applications.',
				'',
				`This documentation covers ${components.meta.fileStats.total} components, each following best practices for accessibility, performance, and type safety.`,
				'',
				'## Components',
				''
			];

			const md = components.components.map((c) => llmsMdGenerator(c)).join('\n\n');

			const response = systemPrompt + '\n\n' + sections.join('\n') + '\n\n' + md;

			setHeaders({
				'Cache-Control': 'public, max-age=3600',
				'Content-Type': 'text/markdown'
			});

			return new Response(response);
		};
	}
};
