import type { PageServerLoad } from './$types.js';

import { fetchComponentFromAPI } from '$data/api/components/components.js';

export const load = (async ({ fetch, params }) => {
	const { directory, id } = params;

	const { componentMetadata } = await fetchComponentFromAPI(fetch, {
		directory,
		id
	});

	return {
		componentMetadata
	};
}) satisfies PageServerLoad;
