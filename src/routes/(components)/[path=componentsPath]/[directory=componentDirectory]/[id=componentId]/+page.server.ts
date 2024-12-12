import type { PageServerLoad } from './$types.js';

import { fetchComponentFromAPI } from '$data/api/components.js';

import { error } from '@sveltejs/kit';

export const load = (async ({ fetch, params }) => {
	const { directory, id } = params;

	const {
		componentMetadata,
		nextComponentMetadata: unknownNextComponentMetadata,
		prevComponentMetadata: unknownPrevComponentMetadata
	} = await fetchComponentFromAPI(fetch, {
		directory,
		id
	});

	//strictly speaking, this should never happen, because the param matcher should prevent it
	//but its here to make typescript happy :)
	if (!componentMetadata.available) error(404, 'Component not found');

	const nextComponentMetadata = unknownNextComponentMetadata?.available
		? unknownNextComponentMetadata
		: undefined;

	const prevComponentMetadata = unknownPrevComponentMetadata?.available
		? unknownPrevComponentMetadata
		: undefined;

	return {
		componentMetadata,
		nextComponentMetadata,
		prevComponentMetadata
	};
}) satisfies PageServerLoad;
