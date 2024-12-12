import type { PageServerLoad } from './$types';

import { fetchComponentsFromAPI } from '$data/api/components';
import { getComponentRouteDirectories, getComponentRouteMetadata } from '$lib/config/routes';

export const load = (async ({ fetch, params }) => {
	const { path } = params;

	const componentDirectories = getComponentRouteDirectories(path);
	const componentsCategories = await fetchComponentsFromAPI(fetch, componentDirectories);

	const routeMetadata = getComponentRouteMetadata(path, {
		count: (() => {
			const total = componentsCategories.reduce((sum, comp) => sum + comp.meta.total, 0);
			const completed = componentsCategories.reduce(
				(sum, comp) => sum + comp.meta.fileStats.completed,
				0
			);
			const todo = componentsCategories.reduce((sum, comp) => sum + comp.meta.fileStats.todo, 0);

			if (todo === 0) return `${total}`;
			return `${completed} / ${total}`;
		})()
	});

	return {
		componentsCategories,
		routeMetadata
	};
}) satisfies PageServerLoad;
