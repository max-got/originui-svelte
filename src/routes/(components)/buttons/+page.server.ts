import type { PageServerLoad } from './$types.js';

import { fetchComponentsFromAPI } from '$lib/utils/handleComponentSource.js';

export const load = (async ({ fetch }) => {
	return {
		componentMetadata: await fetchComponentsFromAPI(fetch, 'buttons.json')
	};
}) satisfies PageServerLoad;
