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

	if (componentMetadata.availability !== 'available') error(404, 'Component not found');

	const nextComponentMetadata =
		unknownNextComponentMetadata?.availability === 'available' && unknownNextComponentMetadata;

	const prevComponentMetadata =
		unknownPrevComponentMetadata?.availability === 'available' && unknownPrevComponentMetadata;

	return {
		componentMetadata,
		nextComponentMetadata,
		prevComponentMetadata
	};
}) satisfies PageServerLoad;
