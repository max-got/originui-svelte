import type { PageServerLoad } from './$types';

import { fetchComponentsFromAPI } from '$data/api/components';
import { getComponentRouteDirectories, getComponentRouteMetadata } from '$lib/config/routes';

export const load = (async ({ fetch, params }) => {
	const { path } = params;

	const componentDirectories = getComponentRouteDirectories(path);
	const componentsCategories = await fetchComponentsFromAPI(fetch, componentDirectories);

	const { completed, todo, total } = componentsCategories.reduce(
		(acc, comp) => ({
			completed: acc.completed + comp.meta.fileStats.completed,
			todo: acc.todo + comp.meta.fileStats.todo,
			total: acc.total + comp.meta.total
		}),
		{ completed: 0, todo: 0, total: 0 }
	);

	const routeMetadata = getComponentRouteMetadata(path, {
		count: (() => {
			if (todo === 0) return `${total}`;
			return `${completed} / ${total}`;
		})()
	});

	return {
		completed,
		componentsCategories,
		routeMetadata,
		todo,
		total
	};
}) satisfies PageServerLoad;
