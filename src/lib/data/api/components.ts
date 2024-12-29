import type { OUIComponent, OUIDirectory } from '$lib/componentRegistry.types';

import { ComponentAPIError, type ComponentAPIResponseJSON } from './components.handler';
import { API_V1_COMPONENTS_ROUTE } from './components.route';

const fetchFromAPI = async <T>(fetch: typeof globalThis.fetch, directory: OUIDirectory) => {
	const response = await fetch(`${API_V1_COMPONENTS_ROUTE}/${directory}.json`);
	if (!response.ok)
		throw new ComponentAPIError(
			`API request for "${directory}" failed: ${response.status} ${response.statusText}`
		);
	return response.json() as T;
};

//Sadly we need to fetch all directories at once, because it is not possible
//to prerender all the component routes in advance.
//Cloudflare Pages has a limit of 100 routes, so we need to make sure we don't hit that limit.
//With this way, we just mimic that for better DX.

export const fetchComponentsFromAPI = (
	fetch: typeof globalThis.fetch,
	directories: OUIDirectory[]
) => Promise.all(directories.map((d) => fetchFromAPI<ComponentAPIResponseJSON>(fetch, d)));

export const fetchComponentFromAPI = async (
	fetch: typeof globalThis.fetch,
	{ directory, id }: { directory: OUIDirectory; id: OUIComponent }
) => {
	const { components } = await fetchFromAPI<ComponentAPIResponseJSON>(fetch, directory);
	const idx = components.findIndex(
		(component) => component.id === id && component.availability === 'available'
	);
	if (idx === -1) throw new ComponentAPIError(`Component ${id} not found in ${directory}`);

	function getPaginationComponentMetadata(idx: number, direction: 'backwards' | 'forwards') {
		if (idx < 0 || idx >= components.length) return undefined;
		let component = components[idx];
		while (component && component.availability !== 'available') {
			idx += direction === 'backwards' ? -1 : 1;
			if (idx < 0 || idx >= components.length) return undefined;
			component = components[idx];
		}
		return component;
	}

	return {
		componentMetadata: components[idx],
		nextComponentMetadata: getPaginationComponentMetadata(idx + 1, 'forwards'),
		prevComponentMetadata: getPaginationComponentMetadata(idx - 1, 'backwards')
	};
};
