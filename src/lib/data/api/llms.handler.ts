import type {
	EntryGenerator as LLMSEntryGenerator,
	RequestHandler as LLMSRequestHandler
} from '../../../routes/(llms.txt)/llms/[directory=componentDirectory].txt/$types';

import type { RegistryItem } from '@shadcn-svelte/registry';

import { getCategoriesWithDetails, getCategoryWithDetails } from '$lib/data/registry/query';

import { llmsMdGenerator } from './llms';

const slugify = (str: string) =>
	str
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');

export const API_V1_LLMS_ENDPOINT_HANDLER = {
	entries: (async () => {
		const categories = getCategoriesWithDetails();
		const filteredCategories = categories.filter(({ meta }) => meta.totalAvailable > 0);

		const slugifiedCategories = filteredCategories.map((category) => ({
			...category,
			slug: encodeURIComponent(slugify(category.name))
		}));

		return slugifiedCategories.map((category) => ({
			directory: category.slug
		}));
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
	GET: (async ({ fetch, params, setHeaders }) => {
		const { directory } = params;

		const category = getCategoryWithDetails(directory);

		if (!category) {
			return new Response('Category not found', { status: 404 });
		}

		if (category.components.length === 0) {
			return new Response('No components found', { status: 404 });
		}

		// Fetch the full component JSON for each registryItem
		const componentData = await Promise.all<RegistryItem[]>(
			category.components.map(async (c) => {
				if (!c.registryItem) return null;
				try {
					const res = await fetch(`/r/${c.registryItem.name}.json`);
					if (!res.ok) return c.registryItem; // fallback to registryItem if fetch fails
					return await res.json();
				} catch {
					return c.registryItem;
				}
			})
		);

		const systemPrompt = `<SYSTEM>This is the llms.txt documentation for the "${category.name}" directory of the Origin UI - Svelte project.</SYSTEM>`;

		const sections = [
			`# "${directory}" directory`,
			'',
			'> A collection of production-ready, accessible UI components built with Svelte 5 and Tailwind CSS. These components are designed to be drop-in solutions for rapidly building modern web applications.',
			'',
			`This documentation covers ${category.components.length} components, each following best practices for accessibility, performance, and type safety.`,
			'',
			'## Components',
			''
		];

		const md = componentData
			.filter(Boolean)
			.map((comp) => llmsMdGenerator(comp))
			.join('\n\n');

		const response = systemPrompt + '\n\n' + sections.join('\n') + '\n\n' + md;

		setHeaders({
			'Cache-Control': 'public, max-age=3600',
			'Content-Type': 'text/markdown'
		});

		return new Response(response);
	}) satisfies LLMSRequestHandler
};
