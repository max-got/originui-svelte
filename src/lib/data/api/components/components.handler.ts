import type {
	EntryGenerator as DirectoryEntryGenerator,
	RequestHandler as DirectoryRequestHandler
} from '../../../../routes/(api)/api/v1/components/[directory=componentDirectory].json/$types';

import type { Component } from 'svelte';

import { getComponentDirectories, getComponentFileNames } from '$lib/componentRegistry';
import { getComponentSource } from '$lib/utils/handleComponentSource';

import type { TypedResponse } from '../helpers/types';

export class ComponentAPIError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ComponentAPIError';
	}
}

export const API_V1_COMPONENTS_ENDPOINT_HANDLER = {
	entries: (async () => {
		const directories = await getComponentDirectories();
		return directories.map((directory) => ({ directory }));
	}) satisfies DirectoryEntryGenerator,
	fallback: (async () => {
		return Response.json(
			{
				message:
					"Components not available (yet?). Create a new issue if you need this. Not even sure why you're here."
			},
			{ status: 404 }
		);
	}) satisfies DirectoryRequestHandler,
	GET: (async ({ params, setHeaders }) => {
		const { directory } = params;

		const componentFiles = await getComponentFileNames(directory);
		const components = await Promise.all(
			componentFiles.map((file) => getComponentSource(directory, file))
		);

		const meta = {
			directory,
			fileStats: {
				completed: components.filter((c) => c.availability === 'available').length,
				todo: components.filter((c) => c.availability === 'todo').length,
				total: components.length
			}
		};

		setHeaders({
			'cache-control': 'public, max-age=31536000, immutable, stale-while-revalidate=86400'
		});

		return Response.json({
			components,
			meta
		}) as TypedResponse<{
			components: typeof components;
			meta: typeof meta;
		}>;
	}) satisfies DirectoryRequestHandler
};
export type ComponentAPIResponseJSON = Awaited<
	ReturnType<Awaited<ReturnType<typeof API_V1_COMPONENTS_ENDPOINT_HANDLER.GET>>['json']>
>;

type ComponentMetadata = ComponentAPIResponseJSON['components'][number];
export type AvailableComponentMetadata = ComponentMetadata & {
	availability: 'available';
};
export type AvailableOUIComponent = AvailableComponentMetadata & {
	Component: Component;
};
