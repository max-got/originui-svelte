export const prerender = true;
import type { EntryGenerator, RequestHandler } from './$types.js';

import { getComponentSource } from '$lib/utils/handleComponentSource.js';

const files = import.meta.glob(
	['/src/lib/components/**/*.svelte', '!/src/lib/components/ui/**/*.svelte'],
	{ eager: true }
);

const AVAILABLE_COMPONENTS = Object.entries(files).reduce(
	(components, [path]) => {
		// Extract directory and filename
		const pathMatch = path.match(/\/components\/([^/]+)\/([^/]+)\.svelte$/);
		if (!pathMatch) return components;

		const [, directory, filename] = pathMatch;

		// Find existing directory entry or create new one
		const existingDirIndex = components.findIndex((c) => c.directory === directory);

		if (existingDirIndex >= 0) {
			components[existingDirIndex].files.push(filename);
			return components;
		}

		return [...components, { directory, files: [filename] }];
	},
	[] as Array<{ directory: string; files: string[] }>
);

export const entries: EntryGenerator = () => {
	return AVAILABLE_COMPONENTS.map(({ directory }) => ({ directory }));
};

export const GET: RequestHandler = async ({ params, setHeaders }) => {
	const { directory } = params;

	const foundDirectory = AVAILABLE_COMPONENTS.find(
		(component) => component.directory === directory
	);

	if (!foundDirectory) {
		throw new Error(`Components ${directory} not found. components/${directory}.json/+server.ts`);
	}

	const components = await Promise.all(
		foundDirectory.files.map((file) => getComponentSource(foundDirectory.directory, file))
	);

	setHeaders({
		'cache-control': 'public, max-age=31536000, immutable, stale-while-revalidate=86400',
		'content-type': 'application/json'
	});

	return new Response(JSON.stringify(components));
};

export const fallback: RequestHandler = async ({ setHeaders }) => {
	setHeaders({
		'content-type': 'application/json'
	});

	return new Response(
		"Components not available (yet?). Create a new issue if you need this. Not even sure why you're here.",
		{
			status: 404
		}
	);
};
