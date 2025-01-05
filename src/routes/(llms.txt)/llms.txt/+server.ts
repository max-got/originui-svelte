import type { RequestHandler } from './$types';

import { dev } from '$app/environment';
import { API_V1_LLMS_ENDPOINT_HANDLER } from '$data/api/llms.handler';

export const prerender = true;

export const GET = (async ({ setHeaders }) => {
	const directories = await API_V1_LLMS_ENDPOINT_HANDLER.entries();

	const sections: string[] = [];

	sections.push('# Origin UI - Svelte Documentation for LLMs');
	sections.push('');
	sections.push(
		`> Origin UI - Svelte is an extensive collection of copy-and-paste components for quickly building app UIs. It's free, open-source, and ready to drop into your projects. Built with Tailwind CSS and Svelte.`
	);
	sections.push('');

	sections.push('## Individual Component Directories Documentation');
	sections.push('');

	directories.forEach(({ directory }) => {
		sections.push(
			`- [${directory.replace('llms-', '')}](${
				!dev ? process.env.SITE_URL : 'http://localhost:3000'
			}/llms/${directory}.txt)`
		);
	});

	setHeaders({
		cacheControl: 'public, max-age=0, must-revalidate',
		contentType: 'text/markdown'
	});
	return new Response(sections.join('\n'));
}) satisfies RequestHandler;
