import type { PageServerLoad } from './$types.js';

import { fetchComponentFromAPI } from '$data/api/components.js';

import { error } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
	const { directory, id } = params;

	const { componentMetadata, nextComponentMetadata, prevComponentMetadata } =
		await fetchComponentFromAPI(fetch, {
			directory,
			id
		});

	//strictly speaking, this should never happen, because the param matcher should prevent it
	//but its here to make typescript happy :)
	if (!componentMetadata.available) error(404, 'Component not found');

	return {
		componentMetadata,
		nextComponentMetadata,
		prevComponentMetadata
	};
}) satisfies PageServerLoad;
