import type {
	EntryGenerator as LLMSEntryGenerator,
	RequestHandler as LLMSRequestHandler
} from '../../../routes/(llms.txt)/llms/[directory=componentDirectory].txt/$types';

import { getComponentDirectories } from '$lib/componentRegistry';

import type { ComponentAPIResponseJSON } from './components.handler';

import { API_V1_COMPONENTS_ROUTE } from './components.route';
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

			const systemPrompt = `<SYSTEM>This is the documentation for the "${components.meta.directory}" component directory.</SYSTEM>`;
			const introSection = `# Start of the "${components.meta.directory}" component documentation`;
			let descriptionSection =
				"> This is a copy-and-paste component for quickly building app UIs. It's free, open-source, and ready to drop into your projects. Built with Tailwind CSS and Svelte.";
			descriptionSection += `\nThis text contains the documentation for all ${components.meta.total} components in this directory.`;

			const md = components.components.map((c) => llmsMdGenerator(c)).join('\n\n');

			const response =
				systemPrompt + '\n\n' + introSection + '\n\n' + descriptionSection + '\n\n' + md;
			setHeaders({
				cacheControl: 'public, max-age=0, must-revalidate',
				contentType: 'text/markdown'
			});

			return new Response(response);
		};
	}
};
