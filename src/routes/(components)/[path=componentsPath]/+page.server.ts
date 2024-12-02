import type { PageServerLoad } from './$types';

import { fetchComponentsFromAPI } from '$data/api/components';
import { getComponentRouteDirectories, getComponentRouteMetadata } from '$lib/config/routes';

export const load = (async ({ fetch, params }) => {
	const { path } = params;

	const componentDirectories = getComponentRouteDirectories(path);
	const componentsMetadata = await fetchComponentsFromAPI(fetch, componentDirectories);

	const routeMetadata = getComponentRouteMetadata(path, {
		count: (() => {
			const total = componentsMetadata.reduce((sum, comp) => sum + comp.meta.total, 0);
			const completed = componentsMetadata.reduce(
				(sum, comp) => sum + comp.meta.fileStats.completed,
				0
			);
			const todo = componentsMetadata.reduce((sum, comp) => sum + comp.meta.fileStats.todo, 0);

			if (todo === 0) return `${total}`;
			return `${completed} / ${total}`;
		})()
	});

	return {
		componentsMetadata,
		routeMetadata
	};
}) satisfies PageServerLoad;
