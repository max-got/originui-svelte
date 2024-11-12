export const prerender = false;

import type { PageLoad } from './$types.js';
import { createComponentRender } from '$lib/utils/handleComponentSource.js';
import { error } from '@sveltejs/kit';

export const load = (async ({ parent, data }) => {
	const { id, isDataRequest } = data; // component id
	const { componentMetadata: _componentMetadata } = await parent(); // all components

	const componentMetadata = _componentMetadata.find((c) => c.id === id);

	if (!componentMetadata) {
		throw error(404, 'Component not found');
	}

	if (!isDataRequest) {
		const component = await createComponentRender(componentMetadata);
		return { component };
	}

	return { componentMetadata };
}) satisfies PageLoad;
